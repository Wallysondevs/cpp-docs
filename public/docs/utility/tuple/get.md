# std::get(std::tuple)

Definido no cabeçalho `[<tuple>](<#/doc/header/tuple>)`

```c
template< std::size_t I, class... Types >
typename std::tuple_element<I, std::tuple<Types...>>::type&
get( std::tuple<Types...>& t ) noexcept;
(constexpr desde C++14)
template< std::size_t I, class... Types >
typename std::tuple_element<I, std::tuple<Types...>>::type&&
get( std::tuple<Types...>&& t ) noexcept;
(constexpr desde C++14)
template< std::size_t I, class... Types >
const typename std::tuple_element<I, std::tuple<Types...>>::type&
get( const std::tuple<Types...>& t ) noexcept;
(constexpr desde C++14)
template< std::size_t I, class... Types >
const typename std::tuple_element<I, std::tuple<Types...>>::type&&
get( const std::tuple<Types...>&& t ) noexcept;
(constexpr desde C++14)
template< class T, class... Types >
constexpr T& get( std::tuple<Types...>& t ) noexcept;
template< class T, class... Types >
constexpr T&& get( std::tuple<Types...>&& t ) noexcept;
template< class T, class... Types >
constexpr const T& get( const std::tuple<Types...>& t ) noexcept;
template< class T, class... Types >
constexpr const T&& get( const std::tuple<Types...>&& t ) noexcept;
```

1-4) Extrai o I-ésimo elemento da tuple. I deve ser um valor inteiro em `[`0`, `sizeof...(Types)`)`.

5-8) Extrai o elemento da tuple t cujo tipo é `T`. Falha na compilação a menos que a tuple tenha exatamente um elemento desse tipo.

### Parâmetros

- **t** — tuple cujo conteúdo extrair

### Valor de retorno

Uma referência para o elemento selecionado de t.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_tuples_by_type`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | Acessando tuples por tipo ([5-8](<#/doc/utility/tuple/get>))

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <string>
    #include <tuple>
    
    int main()
    {
        auto x = std::make_tuple(1, "Foo", 3.14);
    
        // Acesso baseado em índice
        std::cout << "( " << std::get<0>(x)
                  << ", " << std::get<1>(x)
                  << ", " << std::get<2>(x)
                  << " )\n";
    
        // Acesso baseado em tipo (desde C++14)
        std::cout << "( " << std::get<int>(x)
                  << ", " << std::get<const char*>(x)
                  << ", " << std::get<double>(x)
                  << " )\n";
    
        const std::tuple<int, const int, double, double> y(1, 2, 6.9, 9.6);
        const int& i1 = std::get<int>(y); // OK: não ambíguo
        assert(i1 == 1);
        const int& i2 = std::get<const int>(y); // OK: não ambíguo
        assert(i2 == 2);
        // const double& d = std::get<double>(y); // Erro: malformado (ambíguo)
    
        // Nota: std::tie e structured binding podem ser
        // usados para desempacotar uma tuple em objetos individuais.
    }
```

Saída:
```
    ( 1, Foo, 3.14 )
    ( 1, Foo, 3.14 )
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2485](<https://cplusplus.github.io/LWG/issue2485>) | C++11 (por índice)
C++14 (por tipo) | não há sobrecargas para const tuple&& | adicionadas estas sobrecargas (([4](<#/doc/utility/tuple/get>)) e ([8](<#/doc/utility/tuple/get>)))

### Ver também

[ get(std::array)](<#/doc/container/array/get>)(C++11) | acessa um elemento de um `array`
(modelo de função)
[ get(std::pair)](<#/doc/utility/pair/get>)(C++11) | acessa um elemento de um `pair`
(modelo de função)
[ get(std::variant)](<#/doc/utility/variant/get>)(C++17) | lê o valor da variant dado o índice ou o tipo (se o tipo for único), lança exceção em caso de erro
(modelo de função)
[ get(std::ranges::subrange)](<#/doc/ranges/subrange/get>)(C++20) | obtém iterator ou sentinel de um [std::ranges::subrange](<#/doc/ranges/subrange>)
(modelo de função)
[ get(std::complex)](<#/doc/numeric/complex/get>)(C++26) | obtém uma referência para a parte real ou imaginária de um [std::complex](<#/doc/numeric/complex>)
(modelo de função)
[ tie](<#/doc/utility/tuple/tie>)(C++11) | cria uma [tuple](<#/doc/utility/tuple>) de referências lvalue ou desempacota uma tuple em objetos individuais
(modelo de função)
[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tuple do inicializador