# std::basic_osyncstream&lt;CharT,Traits,Allocator&gt;::get_wrapped

streambuf_type* get_wrapped() const noexcept;

  
Retorna um ponteiro para o [std::basic_streambuf](<#/doc/io/basic_streambuf>) encapsulado, obtido ao chamar [`get_wrapped()`](<#/doc/io/basic_syncbuf/get_wrapped>) no std::basic_syncbuf subjacente. 

### Parâmetros

(nenhum) 

### Exemplo

O buffer encapsulado pode ser encapsulado novamente com segurança em um stream de saída sincronizado diferente.

Execute este código
```cpp
    #include <iostream>
    #include <syncstream>
     
    int main()
    {
        std::osyncstream bout1(std::cout);
        bout1 << "Hello, ";
        {
            std::osyncstream(bout1.get_wrapped()) << "Goodbye, " << "Planet!" << '\n';
        } // emite o conteúdo do buffer temporário
        bout1 << "World!" << '\n';
    } // emite o conteúdo de bout1
```

Saída: 
```
    Goodbye, Planet!
    Hello, World!
```

### Veja também

[ (destructor)](<#/doc/io/basic_osyncstream/~basic_osyncstream>) |  destrói o `basic_osyncstream` e emite seu buffer interno   
(função membro pública)  
[ get_wrapped](<#/doc/io/basic_syncbuf/get_wrapped>) |  recupera o ponteiro para o streambuf encapsulado   
(função membro pública de `std::basic_syncbuf<CharT,Traits,Allocator>`)