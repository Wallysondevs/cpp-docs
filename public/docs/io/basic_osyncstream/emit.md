# std::basic_osyncstream&lt;CharT,Traits,Allocator&gt;::emit

void emit();

  
Emite toda a saída armazenada em buffer e executa quaisquer descargas pendentes, chamando [`emit()`](<#/doc/io/basic_syncbuf/emit>) no [`std::basic_syncbuf`](<#/doc/io/basic_syncbuf>) subjacente.

### Parâmetros

(nenhum)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <syncstream>
    
    int main()
    {
        {
            std::osyncstream bout(std::cout);
            bout << "Hello," << '\n'; // no flush
            bout.emit(); // characters transferred; cout not flushed
            bout << "World!" << std::endl; // flush noted; cout not flushed
            bout.emit(); // characters transferred; cout flushed
            bout << "Greetings." << '\n'; // no flush
        } // destructor calls emit(): characters transferred; cout not flushed
    
        // emit can be used for local exception-handling on the wrapped stream
        std::osyncstream bout(std::cout);
        bout << "Hello, " << "World!" << '\n';
        try
        {
            bout.emit();
        }
        catch (...)
        {
            // handle exceptions
        }
    }
```

Saída:
```
    Hello,
    World!
    Greetings.
    Hello, World!
```

### Veja também

[ (destructor)](<#/doc/io/basic_osyncstream/~basic_osyncstream>) | destrói o `basic_osyncstream` e emite seu buffer interno   
(função membro pública)  
[ emit](<#/doc/io/basic_syncbuf/emit>) | transmite atomicamente o buffer interno completo para o streambuf encapsulado   
(função membro pública de `std::basic_syncbuf<CharT,Traits,Allocator>`)