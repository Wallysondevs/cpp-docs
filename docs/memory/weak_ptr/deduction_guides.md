# Guias de dedução para std::weak_ptr

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T >
weak_ptr( std::shared_ptr<T> ) -> weak_ptr<T>;
```

Um [guia de dedução](<#/doc/language/ctad>) é fornecido para [std::weak_ptr](<#/doc/memory/weak_ptr>) para considerar o caso de borda (edge case) não coberto pelos guias de dedução implícitos.

### Exemplo

Execute este código
```cpp
    #include <memory>
    
    int main()
    {
        auto p = std::make_shared<int>(42);
        std::weak_ptr w{p}; // guia de dedução explícito é usado neste caso
    }
```