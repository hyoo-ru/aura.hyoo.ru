namespace $.$$ {
	
	type Entry = {
		title: string
		uri: string
	}
	
	export class $hyoo_aura extends $.$hyoo_aura {
		
		receive( transfer: DataTransfer ) {
			
			const files = [] as File[]
			
			function collect( file: File, entry: FileSystemEntry  ) {
				if( entry.isFile ) files.push( file )
			}
			
			for( const item of transfer.items ) {
				collect( item.getAsFile()!, item.webkitGetAsEntry()! )
			}
			
			this.files_add( files )
			
		}
		
		files_add( files: File[] ) {
			
			const entries = files.map( file => ({
				title: file.name.replace( /\.[^.]+$/, '' ),
				uri: URL.createObjectURL( file ),
			}) )
			
			this.files([ ... this.files(), ... entries ])
			
			return files
		}
		
		@ $mol_mem
		shapes() {
			return this.files().map( ( _, index )=> this.Video( index ) )
		}
		
		file_drop( file: Entry ) {
			this.files( this.files().filter( f => f !== file ) )
		}
		
		@ $mol_mem_key
		video_uri( index: number ) {
			return this.files()[ index ]?.uri ?? 'about:blank'
		}
		
		shape_drop( index: number ) {
			const files = this.files().slice()
			files.splice( index, 1 )
			this.files( files )
		}
		
	}

	export class $hyoo_aura_video extends $.$hyoo_aura_video {
		
		// move_start( event: PointerEvent ) {
		// 	console.log( event )
		// 	this.anchor( this.action_point() )
		// }
		
		// move( event: PointerEvent ) {
		// 	console.log( this.action_point() )
		// 	const anchor = this.anchor()
		// 	// this.pos( this.action_point().multed0(2) )
		// }
		
		transform() {
			const pos = this.pos()
			return `translate(${ pos[0] }px, ${ pos[1] }px) scale(${ this.zoom() })`
		}
		
		wheel( event: WheelEvent ) {
			
			if( !event.altKey ) return
			event.preventDefault()
			
			const prev = this.aspect()
			const next = prev * ( 1 - .001 * event.deltaY )
			this.aspect( next )
	
		}
		
	}

	export class $hyoo_aura_video_output extends $.$hyoo_aura_video_output {
		
		aspect_style() {
			return String( this.aspect() )
		}
		
	}

}
