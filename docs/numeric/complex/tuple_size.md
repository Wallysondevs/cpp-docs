# std::tuple_size&lt;std::complex&gt;

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< class T >
struct tuple_size<std::complex<T>>
: std::integral_constant<std::size_t, 2> {};
```

A especialização parcial de [`std::tuple_size`](<#/doc/utility/tuple_size>) para [std::complex](<#/doc/numeric/complex>) fornece uma maneira em tempo de compilação de obter o número de componentes de um `complex`, que é sempre 2, usando sintaxe tipo tupla. Ela é fornecida para suporte a structured binding.

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | o valor constante 2
(constante membro estática pública)

### Funções membro

operator std::size_t | converte o objeto para [std::size_t](<#/doc/types/size_t>), retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | [std::size_t](<#/doc/types/size_t>)
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), value>

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_tuple_like`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Adiciona protocolo de tupla a [std::complex](<#/doc/numeric/complex>)

### Exemplo

Execute este código
```cpp
    #include <complex>
    
    static_assert(std::tuple_size_v<std::complex<float>> == 2);
    
    static_assert([]
    {
        using namespace std::literals;
        auto [re, im] = -1.5 + 2.5i;
        return re == -1.5 && im == 2.5;
    }());
    
    static_assert([]
    {
        using namespace std::literals;
        auto z = std::complex<double>{};
        auto& [re, im] = z;
        re = 1.0;
        im = 2.0;
        return z == 1.0 + 2.0i;
    }());
    
    int main() {}
```

### Veja também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tupla do inicializador
---|---
[ tuple_size](<#/doc/utility/tuple_size>)(C++11) | obtém o número de elementos de um tipo tipo-tupla
(modelo de classe)
[ std::tuple_element<std::complex>](<#/doc/numeric/complex/tuple_element>)(C++26) | obtém o tipo numérico real e imaginário subjacente de um [std::complex](<#/doc/numeric/complex>)
(especialização de modelo de classe)
[ get(std::complex)](<#/doc/numeric/complex/get>)(C++26) | obtém uma referência para a parte real ou imaginária de um [std::complex](<#/doc/numeric/complex>)
(modelo de função)