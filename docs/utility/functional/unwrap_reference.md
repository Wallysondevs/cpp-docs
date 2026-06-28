# std::unwrap_reference, std::unwrap_ref_decay

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
Definido no cabeçalho `<functional>`
template< class T >
struct unwrap_reference;
template< class T >
struct unwrap_ref_decay;
```

Desembrulha qualquer [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>): alterando [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)&lt;U&gt; para `U&`.

1) Se `T` for uma especialização de [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>), a desembrulha; caso contrário, `T` permanece o mesmo.

2) Se o `T` decaído for uma especialização de [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>), a desembrulha; caso contrário, `T` é decaído.

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Tipos aninhados

Tipo | Definição
---|---
`type` | (1) `U&` se `T` for [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)&lt;U&gt;; `T` caso contrário
(2) `U&` se [std::decay_t](<#/doc/types/decay>)&lt;T&gt; for [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)&lt;U&gt;; [std::decay_t](<#/doc/types/decay>)&lt;T&gt; caso contrário

### Tipos auxiliares

```cpp
template<class T>
using unwrap_reference_t = unwrap_reference<T>::type;  // (1) (desde C++20)
template<class T>
using unwrap_ref_decay_t = unwrap_ref_decay<T>::type;  // (2) (desde C++20)
```

### Possível implementação
```cpp
    template<class T>
    struct unwrap_reference { using type = T; };
    template<class U>
    struct unwrap_reference<std::reference_wrapper<U>> { using type = U&; };
    
    template<class T>
    struct unwrap_ref_decay : std::unwrap_reference<std::decay_t<T>> {};
```

---

### Notas

`std::unwrap_ref_decay` realiza a mesma transformação usada por [std::make_pair](<#/doc/utility/pair/make_pair>) e [std::make_tuple](<#/doc/utility/tuple/make_tuple>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_unwrap_ref`](<#/doc/feature_test>) | [`201811L`](<#/>) | (C++20) | `std::unwrap_ref_decay` e `std::unwrap_reference`

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <functional>
    #include <iostream>
    #include <type_traits>
    
    int main()
    {
        static_assert(std::is_same_v<std::unwrap_reference_t<int>, int>);
        static_assert(std::is_same_v<std::unwrap_reference_t<const int>, const int>);
        static_assert(std::is_same_v<std::unwrap_reference_t<int&>, int&>);
        static_assert(std::is_same_v<std::unwrap_reference_t<int&&>, int&&>);
        static_assert(std::is_same_v<std::unwrap_reference_t<int*>, int*>);
    
        {
            using T = std::reference_wrapper<int>;
            using X = std::unwrap_reference_t<T>;
            static_assert(std::is_same_v<X, int&>);
        }
        {
            using T = std::reference_wrapper<int&>;
            using X = std::unwrap_reference_t<T>;
            static_assert(std::is_same_v<X, int&>);
        }
    
        static_assert(std::is_same_v<std::unwrap_ref_decay_t<int>, int>);
        static_assert(std::is_same_v<std::unwrap_ref_decay_t<const int>, int>);
        static_assert(std::is_same_v<std::unwrap_ref_decay_t<const int&>, int>);
    
        {
            using T = std::reference_wrapper<int&&>;
            using X = std::unwrap_ref_decay_t<T>;
            static_assert(std::is_same_v<X, int&>);
        }
    
        {
            auto reset = []<typename T>(T&& z)
            {
            //  x = 0; // Erro: não funciona se T for reference_wrapper<>
                // converte T&& em T& para tipos comuns
                // converte T&& em U& para reference_wrapper<U>
                decltype(auto) r = std::unwrap_reference_t<T>(z);
                std::cout << "r: " << r << '\n';
                r = 0; // OK, r tem tipo de referência
            };
    
            int x = 1;
            reset(x);
            assert(x == 0);
    
            int y = 2;
            reset(std::ref(y));
            assert(y == 0);
        }
    }
```

Saída:
```
    r: 1
    r: 2
```

### Ver também

[ reference_wrapper](<#/doc/utility/functional/reference_wrapper>)(C++11) | Wrapper de referência [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>)
(class template)
[ make_pair](<#/doc/utility/pair/make_pair>) | cria um objeto `pair` de um tipo, determinado pelos tipos dos argumentos
(function template)
[ make_tuple](<#/doc/utility/tuple/make_tuple>)(C++11) | cria um objeto `tuple` do tipo definido pelos tipos dos argumentos
(function template)