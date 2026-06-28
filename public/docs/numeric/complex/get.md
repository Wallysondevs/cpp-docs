# std::get(std::complex)

Definido no cabeçalho `[<complex>](<#/doc/header/complex>)`

```c
template< std::size_t I >
friend constexpr T& get( std::complex<T>& x );
template< std::size_t I >
friend constexpr const T& get( const std::complex<T>& x );
template< std::size_t I >
friend constexpr T&& get( std::complex<T>&& x );
template< std::size_t I >
friend constexpr const T&& get( const std::complex<T>&& x );
```

Retorna a referência para a parte real ou imaginária de um `complex` quando I == 0 ou I == 1, respectivamente. É fornecido principalmente para suporte a structured binding.

### Parâmetros

- **x** — um `complex`

### Valor de retorno

1-4) Uma referência para a parte real ou imaginária do valor armazenado quando I == 0 ou I == 1, respectivamente.

### Observações

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_tuple_like`](<#/doc/feature_test>) | [`202311L`](<#/>) | (C++26) | Adiciona o protocolo tuple a [std::complex](<#/doc/numeric/complex>)

### Exemplo

Execute este código
```cpp
    #include <complex>
    
    static_assert([z = std::complex(1.0, 2.0)]
    {
    #if __cpp_lib_tuple_like >= 202311L
        return std::get<0>(z) == 1.0 and std::get<1>(z) == 2.0;
    #else
        return z.real() == 1.0 and z.imag() == 2.0;
    #endif
    }());
    
    int main() {}
```

### Veja também

[Structured binding](<#/doc/language/structured_binding>) (C++17) | vincula os nomes especificados a sub-objetos ou elementos de tupla do inicializador
---|---
[ get(std::tuple)](<#/doc/utility/tuple/get>)(C++11) | tuple acessa o elemento especificado
(modelo de função)
[ get(std::pair)](<#/doc/utility/pair/get>)(C++11) | acessa um elemento de um `pair`
(modelo de função)
[ get(std::array)](<#/doc/container/array/get>)(C++11) | acessa um elemento de um `array`
(modelo de função)