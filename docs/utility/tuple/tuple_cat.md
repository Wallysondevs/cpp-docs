# std::tuple_cat

Definido no cabeçalho `<tuple>`

```c
template< class... Tuples >
std::tuple</* CTypes */...> tuple_cat( Tuples&&... args );
(até C++14)
template< class... Tuples >
constexpr std::tuple</* CTypes */...> tuple_cat( Tuples&&... args );
(até C++23)
template< tuple-like... Tuples >
constexpr std::tuple</* CTypes */...> tuple_cat( Tuples&&... args );
```

Constrói uma tuple que é uma concatenação de todas as tuples em args. Os tipos de elemento /* CTypes */ da tuple retornada são formados pela concatenação dos pacotes de tipos dos elementos de todos os tipos [std::tuple](<#/doc/utility/tuple>)(até C++23)[_tuple-like_](<#/doc/utility/tuple/tuple-like>)(desde C++23) em `Tuples` em ordem.

O comportamento é indefinido se qualquer tipo em [std::decay_t](<#/doc/types/decay>)&lt;Tuples&gt;... não for uma especialização de [std::tuple](<#/doc/utility/tuple>). No entanto, uma implementação pode optar por suportar tipos (como [std::array](<#/doc/container/array>) e [std::pair](<#/doc/utility/pair>)) que seguem o protocolo tuple-like. | (até C++23)
---|---
Os tipos [std::decay_t](<#/doc/types/decay>)&lt;Tuples&gt;... são restritos a serem tuple-like, ou seja, cada tipo neles é exigido ser uma especialização de [std::tuple](<#/doc/utility/tuple>) ou outro tipo (como [std::array](<#/doc/container/array>) e [std::pair](<#/doc/utility/pair>)) que modela [`_tuple-like_`](<#/doc/utility/tuple/tuple-like>). | (desde C++23)

Se qualquer tipo em /* CTypes */ não for construtível a partir do tipo do elemento correspondente na sequência de elementos concatenados de args, o comportamento é indefinido(até C++23)o programa é malformado(desde C++23).

### Parâmetros

- **args** — zero ou mais tuples para concatenar

### Valor de retorno

Um objeto [std::tuple](<#/doc/utility/tuple>) composto por todos os elementos de todas as tuples de argumento construídos a partir de std::get&lt;j&gt;([std::forward](<#/doc/utility/forward>)&lt;Ti&gt;(arg)) para cada elemento individual.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <tuple>
    
    // helper function to print a tuple of any size
    template<class Tuple, std::size_t N>
    struct TuplePrinter
    {
        static void print(const Tuple& t)
        {
            TuplePrinter<Tuple, N - 1>::print(t);
            std::cout << ", " << std::get<N-1>(t);
        }
    };
    
    template<class Tuple>
    struct TuplePrinter<Tuple, 1>
    {
        static void print(const Tuple& t)
        {
            std::cout << std::get<0>(t);
        }
    };
    
    template<typename... Args, std::enable_if_t<sizeof...(Args) == 0, int> = 0>
    void print(const std::tuple<Args...>& t)
    {
        std::cout << "()\n";
    }
    
    template<typename... Args, std::enable_if_t<sizeof...(Args) != 0, int> = 0>
    void print(const std::tuple<Args...>& t)
    {
        std::cout << "(";
        TuplePrinter<decltype(t), sizeof...(Args)>::print(t);
        std::cout << ")\n";
    }
    // end helper function
    
    int main()
    {
        std::tuple<int, std::string, float> t1(10, "Test", 3.14);
        int n = 7;
        auto t2 = std::tuple_cat(t1, std::make_tuple("Foo", "bar"), t1, std::tie(n));
        n = 42;
        print(t2);
    }
```

Saída:
```
    (10, Test, 3.14, Foo, bar, 10, Test, 3.14, 42)
```

### Veja também

[ make_tuple](<#/doc/utility/tuple/make_tuple>)(C++11) | cria um objeto `tuple` do tipo definido pelos tipos dos argumentos
(modelo de função)
[ tie](<#/doc/utility/tuple/tie>)(C++11) | cria uma [tuple](<#/doc/utility/tuple>) de referências lvalue ou desempacota uma tuple em objetos individuais
(modelo de função)
[ forward_as_tuple](<#/doc/utility/tuple/forward_as_tuple>)(C++11) | cria uma `tuple` de [referências de encaminhamento](<#/doc/language/reference>)
(modelo de função)