# Guias de dedução para std::optional

Definido no cabeçalho `[<optional>](<#/doc/header/optional>)`

```c
template< class T >
optional(T) -> optional<T>;
```

Uma [guia de dedução](<#/doc/language/ctad>) é fornecida para [std::optional](<#/doc/utility/optional>) para considerar os casos de borda não cobertos pelas guias de dedução implícitas, em particular, argumentos não copiáveis e conversão de array para ponteiro.

### Exemplo

Execute este código
```cpp
    #include <optional>
    #include <type_traits>
     
    int main()
    {
        int a[2];
        std::optional oa{a}; // usa guia de dedução explícita
        static_assert(std::is_same_v<decltype(oa), std::optional<int*>> == true);
    }
```