# std::ios_base::openmode

```cpp
typedef /* implementation defined */ openmode;
static constexpr openmode app = /* implementation defined */;
static constexpr openmode binary = /* implementation defined */;
static constexpr openmode in = /* implementation defined */;
static constexpr openmode out = /* implementation defined */;
static constexpr openmode trunc = /* implementation defined */;
static constexpr openmode ate = /* implementation defined */;
static constexpr openmode noreplace = /* implementation defined */;  // (desde C++23)
```

  
Especifica as flags disponíveis para abertura de arquivo. É um [BitmaskType](<#/doc/named_req/BitmaskType>), as seguintes constantes são definidas: 

Constante  |  Explicação   
---|---
`app` |  posiciona no final do stream antes de cada escrita   
`binary` |  abre em [modo binário](<#/doc/io/c/FILE>)  
`in` |  abre para leitura   
`out` |  abre para escrita   
`trunc` |  descarta o conteúdo do stream ao abrir   
`ate` |  posiciona no final do stream imediatamente após a abertura   
`noreplace` (C++23) |  abre em modo exclusivo   
  
### Exemplo

Execute este código
```
    #include <fstream>
    #include <iostream>
    #include <string>
     
    int main()
    {
        const char* fname = "unique_name.txt";
     
        // write to a temporary stream object
        std::fstream(fname, std::ios::out | std::ios::trunc) << "Hi";
     
        std::string s;
        std::fstream(fname, std::ios::in) >> s;
        std::cout << s << '\n';
    }
```

Saída: 
```
    Hi
```

### Veja também

[ open](<#/doc/io/basic_filebuf/open>) |  abre um arquivo e o configura como a sequência de caracteres associada   
(função membro pública de `std::basic_filebuf<CharT,Traits>`)  
[ (constructor)](<#/doc/io/basic_stringbuf/basic_stringbuf>) |  constrói um objeto `basic_stringbuf`   
(função membro pública de `std::basic_stringbuf<CharT,Traits,Allocator>`)