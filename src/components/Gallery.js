import React from 'react';
import './Gallery.scss'
import Loading from './Loading';

let imgUrls = [];
let imageObjects = {}
let imageObjectsKeys = []

function chunkArray(myArray, chunk_size) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    let toSplitInto = arrayLength / chunk_size;

    for (index = 0; index < arrayLength; index += toSplitInto) {
        let myChunk = myArray.slice(index, index + toSplitInto);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentIndex: null, isBottomDebouncer: false };
        this.closeModal = this.closeModal.bind(this);
        this.findNext = this.findNext.bind(this);
        this.findPrev = this.findPrev.bind(this);
        this.renderImageContent = this.renderImageContent.bind(this);
        this._handleScroll = this._handleScroll.bind(this);
        this.debounce = this.debounce.bind(this);
        this.isAtBottom = this.debounce(this._isAtBottom.bind(this));
    }

    componentDidMount() {
        document.getElementById("gallery-grid").addEventListener("scroll", this._handleScroll)
    }

    _isAtBottom(element) {
        const isAtBottom = Math.ceil(element.scrollHeight - element.scrollTop) === element.clientHeight || Math.floor(element.scrollHeight - element.scrollTop) === element.clientHeight

        return isAtBottom
    }

    debounce(fn) {
        let context = this
        let isExecuting = false;
        return (function () {
            let args = arguments
            if (!isExecuting) {
                isExecuting = true
                setTimeout(() => { isExecuting = false }, 10)
                return fn.apply(context, args)
            }
        })
    }

    _handleScroll(e) {
        const { fetchNextPhotos } = this.props
        let flag = this._isAtBottom(e.target)
        if (flag) {
            if (!this.state.isFetching) {
                this.setState({ isFetching: true })
                setTimeout(() => { this.setState({ isFetching: false }) }, 500)
                fetchNextPhotos(this.props.appState.currentUser)
            }
        }
    }

    openModal(e, index) {
        this.setState({ modalURL: e.currentTarget.dataset.url, id: e.currentTarget.dataset.id });
    }

    closeModal(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        this.setState({ modalURL: null, id: "" });
    }

    findPrev(e) {
        if (e !== undefined) {
            e.preventDefault();
        }

        let newID = imageObjectsKeys[imageObjectsKeys.indexOf(this.state.id) - 1]
        this.setState({ modalURL: imageObjects[newID], id: newID })
    }

    findNext(e) {
        if (e !== undefined) {
            e.preventDefault();
        }

        let newID = imageObjectsKeys[imageObjectsKeys.indexOf(this.state.id) - 1]
        this.setState({ modalURL: imageObjects[newID], id: newID })
    }

    renderImageContent(src, index) {
        return (
            <div className="imageContent" onClick={e => this.openModal(e, index)} onKeyDown={() => { }} key={src.id} data-url={src.urls.regular} data-id={src.id}>
                <img className="imageContent" src={src.urls.thumb} key={src.id} />
            </div>
        );
    }

    renderColumnWiseImage(photos) {
        let photosChunk = chunkArray(photos, 4);
        return (
            <div className='row' >
                <div className="column">
                    {photosChunk[0].map(this.renderImageContent)}
                </div>
                <div className="column">
                    {photosChunk[1].map(this.renderImageContent)}
                </div>
                <div className="column">
                    {photosChunk[2].map(this.renderImageContent)}
                </div>
                <div className="column">
                    {photosChunk[3].map(this.renderImageContent)}
                </div>
            </div >
        )
    }

    componentWillReceiveProps() {

    }

    render() {
        const { currentIndex, modalURL } = this.state;
        const { photos, imageURLS, isLoading, loading } = this.props
        imgUrls = imageURLS
        photos.forEach(function (photo) {
            imageObjects[photo.id] = photo.urls.regular
        })
        imageObjectsKeys = Object.keys(imageObjects)

        let oldIndex = imageObjectsKeys.indexOf(this.state.id)
        let hasPrev = oldIndex > 0
        let hasNext = oldIndex + 1 < imageObjectsKeys.length

        return (
            <div className="gallery-container" id="gallery-container" >
                <div className="gallery-grid" id="gallery-grid">
                    {/* {photos.length == 0 ? <h1>No Images</h1> : photos.map(this.renderImageContent)} */}
                    {photos.length == 0 ? <h1>No Images</h1> : this.renderColumnWiseImage(photos)}
                    {loading && <Loading></Loading>}
                </div>
                <GalleryModal
                    closeModal={() => { this.closeModal() }}
                    findPrev={this.findPrev}
                    findNext={this.findNext}
                    hasPrev={hasPrev}
                    hasNext={hasNext}
                    src={modalURL}
                />
            </div>
        );
    }
}

class GalleryModal extends React.Component {
    constructor() {
        super();
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        document.body.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnMount() {
        document.body.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(e) {
        if (e.keyCode === 27) this.props.closeModal();
        if (e.keyCode === 37 && this.props.hasPrev) this.props.findPrev();
        if (e.keyCode === 39 && this.props.hasNext) this.props.findNext();
    }

    render() {
        const {
            closeModal, hasNext, hasPrev, findNext, findPrev, src,
        } = this.props;
        if (!src) {
            return null;
        }
        return (
            <div>
                <div className="modal-overlay" onClick={closeModal} />
                <div isOpen={!!src} className="modal">
                    <div className="modal-body">
                        <a className="modal-close" onClick={closeModal} onKeyDown={this.handleKeyDown}>&times;</a>
                        {hasPrev && <a className="modal-prev" onClick={findPrev} onKeyDown={this.handleKeyDown}>&lsaquo;</a>}
                        {hasNext && <a className="modal-next" onClick={findNext} onKeyDown={this.handleKeyDown}>&rsaquo;</a>}
                        <img src={src} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Gallery;
