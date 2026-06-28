Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
template<class... UTypes>
tuple(UTypes...) -> tuple<UTypes...>;
template<class T1, class T2>
tuple(std::pair<T1, T2>) -> tuple<T1, T2>;
template<class Alloc, class... UTypes>
tuple(std::allocator_arg_t, Alloc, UTypes...) -> tuple<UTypes...>;
template<class Alloc, class T1, class T2>
tuple(std::allocator_arg_t, Alloc, std::pair<T1, T2>) -> tuple<T1, T2>;
template<class Alloc, class... UTypes>
tuple(std::allocator_arg_t, Alloc, tuple<UTypes...>) -> tuple<UTypes...>;
```

Estes [guias de dedução](<#/doc/language/ctad>) são fornecidos para [std::tuple](<#/doc/utility/tuple>) para lidar com os casos de borda não cobertos pelos guias de dedução implícitos, em particular, argumentos não copiáveis e conversão de array para ponteiro.

### Exemplo

Execute este código
```cpp
    #include <tuple>
    int main()
    {
        int a[2], b[3], c[4];
        std::tuple t1{a, b, c}; // um guia de dedução explícito é usado neste caso
    }
```