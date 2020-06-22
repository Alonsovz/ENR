
@foreach($docsSeleccionados as $img)

@if(substr($img->archivo, -4) == 'JPEG' || substr($img->archivo, -3) == 'jpg' 
            || substr($img->archivo, -3) == 'png')
                <img  src="C:\xampp\htdocs\ENR\backend\ENRBack\public\files\{{$img->archivo}}"
                style="width: 540px !important; height: 440px !important;margin-left:10% !important;
                margin-top:25px;">
            

@endif     



@endforeach