# std::make_tuple

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
template< class... Types >
std::tuple<VTypes...> make_tuple( Types&&... args );
(constexpr desde C++14)
```

Cria um objeto tuple, deduzindo o tipo alvo a partir dos tipos dos argumentos.

Para cada `Ti` em `Types...`, o tipo correspondente `Vi` em `VTypes...` é [std::decay](<#/doc/types/decay>)&lt;Ti&gt;::type a menos que a aplicação de [std::decay](<#/doc/types/decay>) resulte em [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)&lt;X&gt; para algum tipo `X`, caso em que o tipo deduzido é `X&`.

### Parâmetros

- **args** — zero ou mais argumentos para construir a tuple a partir deles

### Valor de retorno

Um objeto [std::tuple](<#/doc/utility/tuple>) contendo os valores fornecidos, criado como se por [std::tuple](<#/doc/utility/tuple>)<VTypes...>([std::forward](<#/doc/utility/forward>)&lt;Types&gt;(t)...).

### Possível implementação
```cpp
    template <class T>
    struct unwrap_refwrapper
    {
        using type = T;
    };
    
    template <class T>
    struct unwrap_refwrapper<std::reference_wrapper<T>>
    {
        using type = T&;
    };
    
    template <class T>
    using unwrap_decay_t = typename unwrap_refwrapper<typename std::decay<T>::type>::type;
    // ou use std::unwrap_ref_decay_t (desde C++20)
    
    template <class... Types>
    constexpr // desde C++14
    std::tuple<unwrap_decay_t<Types>...> make_tuple(Types&&... args)
    {
        return std::tuple<unwrap_decay_t<Types>...>(std::forward<Types>(args)...);
    }
```

---

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <tuple>
    #include <functional>
    
    std::tuple<int, int> f() // esta função retorna múltiplos valores
    {
        int x = 5;
        return std::make_tuple(x, 7); // return {x,7}; em C++17
    }
    
    int main()
    {
        // construção de tuple heterogênea
        int n = 1;
        auto t = std::make_tuple(10, "Test", 3.14, std::ref(n), n);
        n = 7;
        std::cout << "The value of t is ("
                  << std::get<0>(t) << ", "
                  << std::get<1>(t) << ", "
                  << std::get<2>(t) << ", "
                  << std::get<3>(t) << ", "
                  << std::get<4>(t) << ")\n";
    
        // função que retorna múltiplos valores
        int a, b;
        std::tie(a, b) = f();
        std::cout << a << ' ' << b << '\n';
    }
```

Saída:
```
    The value of t is (10, Test, 3.14, 7, 1)
    5 7
```

### Veja também

[ tie](<#/doc/utility/tuple/tie>)(C++11) | cria uma [tuple](<#/doc/utility/tuple>) de referências lvalue ou desempacota uma tuple em objetos individuais
(modelo de função)
[ forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(C++11) | cria uma `tuple` de [forwarding references](<#/doc/language/reference>)
(modelo de função)
[ tuple_cat](<#/doc/utility/tuple/tuple_cat>)(C++11) | cria uma `tuple` concatenando qualquer número de tuples
(modelo de função)
[ apply](<#/doc/utility/apply>)(C++17) | chama uma função com uma tuple de argumentos
(modelo de função)