# Guias de dedução para std::shared_ptr

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T >
shared_ptr( std::weak_ptr<T> ) -> shared_ptr<T>;
template< class T, class D >
shared_ptr( std::unique_ptr<T, D> ) -> shared_ptr<T>;
```

Esses [guias de dedução](<#/doc/language/ctad>) são fornecidos para [std::shared_ptr](<#/doc/memory/shared_ptr>) para cobrir os casos de borda não contemplados pelos guias de dedução implícitos.

Note que não há dedução de argumentos de template de classe a partir de tipos de ponteiro porque é impossível distinguir ponteiros obtidos de formas de new para array e não-array.

### Exemplo

Execute este código
```
    #include <memory>
    
    int main()
    {
        auto p = std::make_shared<int>(42);
        std::weak_ptr w{p};    // um guia de dedução explícito é usado neste caso
        std::shared_ptr p2{w}; // um guia de dedução explícito é usado neste caso
    }
```