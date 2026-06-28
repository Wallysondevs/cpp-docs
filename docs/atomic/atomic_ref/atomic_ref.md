# std::atomic_ref&lt;T&gt;::atomic_ref

explicit atomic_ref( T& obj ); | (1) | (constexpr desde C++26)
---|---|---
atomic_ref( const atomic_ref& ref ) noexcept; | (2) | (constexpr desde C++26)

Constrói um novo objeto `atomic_ref`.

1) Constrói um objeto `atomic_ref` referenciando o objeto obj.

Se obj não estiver alinhado a [`required_alignment`](<#/doc/atomic/atomic_ref/required_alignment>), o comportamento é indefinido.

2) Constrói um objeto `atomic_ref` referenciando o objeto referenciado por ref.

### Parâmetros

- **obj** — objeto a ser referenciado
- **ref** — outro objeto `atomic_ref` para copiar

### Exemplo

O programa incrementa os valores em um container usando várias threads. Em seguida, a soma final é impressa. O acesso não atômico pode "perder" os resultados de algumas operações devido a data-races.

Execute este código
```cpp
    #include <atomic>
    #include <iostream>
    #include <numeric>
    #include <thread>
    #include <vector>
     
    int main()
    {
        using Data = std::vector<char>;
     
        auto inc_atomically = 
        {
            for (Data::value_type& x : data)
            {
                auto xx = std::atomic_ref<Data::value_type>(x);
                ++xx; // atomic read-modify-write
            }
        };
     
        auto inc_directly = 
        {
            for (Data::value_type& x : data)
                ++x;
        };
     
        auto test_run = 
        {
            Data data(10'000'000);
            {
                std::jthread j1{Fun, std::ref(data)};
                std::jthread j2{Fun, std::ref(data)};
                std::jthread j3{Fun, std::ref(data)};
                std::jthread j4{Fun, std::ref(data)};
            }
            std::cout << "sum = " << std::accumulate(cbegin(data), cend(data), 0) << '\n';
        };
     
        test_run(inc_atomically);
        test_run(inc_directly);
    }
```

Saída possível:
```
    sum = 40000000
    sum = 39994973
```