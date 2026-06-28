# std::tuple_element&lt;std::complex&gt;

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< std::size_t I, class T >
struct tuple_element<I, std::complex<T>>;
```

As especializações parciais de [`std::tuple_element`](<#/doc/utility/tuple_element>) para [std::complex](<#/doc/numeric/complex>) fornecem acesso em tempo de compilação ao tipo numérico real e imaginário subjacente de um `complex`, usando sintaxe similar a tuple. Elas são fornecidas para suporte a structured binding. O programa é malformado se I >= 2.

### Tipos membro

Tipo membro | Definição
---|---
`type` | `T`

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_tuple_like`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Adiciona protocolo de tuple a [std::complex](<#/doc/numeric/complex>)

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <type_traits>
    
    static_assert([z = std::complex<float>()]
    {
        using T = decltype(z);
        return
    #if __cpp_lib_tuple_like >= 202311L
            std::is_same_v<std::tuple_element_t<0, T>, float> &&
            std::is_same_v<std::tuple_element_t<1, T>, float> &&
    #endif
            T::value_type == float;
    }());
    
    int main() {}
```

### Ver também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tuple do inicializador
---|---
[ tuple_element](<#/doc/utility/tuple_element>)(C++11) | obtém os tipos de elemento de um tipo similar a tuple
(modelo de classe)
[ std::tuple_size<std::complex>](<#/doc/numeric/complex/tuple_size>)(C++26) | obtém o tamanho de um [std::complex](<#/doc/numeric/complex>)
(especialização de modelo de classe)
[ get(std::complex)](<#/doc/numeric/complex/get>)(C++26) | obtém uma referência à parte real ou imaginária de um [std::complex](<#/doc/numeric/complex>)
(modelo de função)