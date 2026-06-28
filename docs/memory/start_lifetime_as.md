# std::start_lifetime_as, std::start_lifetime_as_array

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
`std::start_lifetime_as`
template< class T >
T* start_lifetime_as( void* p ) noexcept;
template< class T >
const T* start_lifetime_as( const void* p ) noexcept;
template< class T >
volatile T* start_lifetime_as( volatile void* p ) noexcept;
template< class T >
const volatile T* start_lifetime_as( const volatile void* p ) noexcept;
`std::start_lifetime_as_array`
template< class T >
T* start_lifetime_as_array( void* p, std::size_t n ) noexcept;
template< class T >
const T* start_lifetime_as_array( const void* p,
std::size_t n ) noexcept;
template< class T >
volatile T* start_lifetime_as_array( volatile void* p,
std::size_t n ) noexcept;
template< class T >
const volatile T* start_lifetime_as_array( const volatile void* p,
std::size_t n ) noexcept;
```

1-4) [Cria implicitamente](<#/doc/language/objects>) um objeto completo do tipo `T` (cujo endereço é p) e objetos aninhados dentro dele. O valor de cada objeto criado `_obj_` do tipo [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) `U` é determinado da mesma maneira que para uma chamada a [std::bit_cast](<#/doc/numeric/bit_cast>)&lt;U&gt;(E), exceto que o armazenamento não é realmente acessado, onde `E` é o lvalue do tipo `U` denotando `_obj_`. Caso contrário, os valores de tais objetos criados são não especificados.

  * `T` deve ser um [ImplicitLifetimeType](<#/doc/named_req/ImplicitLifetimeType>) e deve ser um [tipo completo](<#/doc/language/type-id>). Caso contrário, o programa é malformado.
  * O comportamento é indefinido se:

    
  * `[`p`, `(char*)p + sizeof(T)`)` não denota uma região de armazenamento alocado que é um subconjunto da região de armazenamento acessível através de p, ou
  * a região não está adequadamente alinhada para o `T`.

  * Note que o valor não especificado pode ser indeterminado.

5-8) [Cria implicitamente](<#/doc/language/objects>) um array com tipo de elemento `T` e comprimento n. Para ser preciso, se n > 0 for verdadeiro, é equivalente a std::start_lifetime_as&lt;U&gt;(p) onde `U` é o tipo "array de n `T`s". Caso contrário, a função não tem efeitos.

  * `T` deve ser um [tipo completo](<#/doc/language/type-id>). Caso contrário, o programa é malformado.
  * O comportamento é indefinido se:

    
  * p não nulo não está adequadamente alinhado para um array de `T`, ou
  * n <= [std::size_t](<#/doc/types/size_t>)(-1) / sizeof(T) é falso, ou
  * n > 0 e `[`(char*)p`, `(char*)p + (n * sizeof(T))`)` não denota uma região de armazenamento alocado que é um subconjunto da região de armazenamento acessível através de p.

### Parâmetros

- **p** — o endereço da região que consiste em objetos
- **n** — o número de elementos do array a ser criado

### Valor de retorno

1-4) Um ponteiro para o objeto completo conforme descrito acima.

5-8) Um ponteiro para o primeiro elemento do array criado, se houver; caso contrário, um ponteiro que se compara igual a p.

### Notas

`new (void_ptr) unsigned char[size]` ou `new (void_ptr) [std::byte](<#/doc/types/byte>)[size]` funciona como uma versão sem tipo de `std::start_lifetime_as`, mas não mantém a representação do objeto.

`std::start_lifetime_as` lida com tipos não-array, bem como arrays de limite conhecido, enquanto `std::start_lifetime_as_array` lida com arrays de limite desconhecido.

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_start_lifetime_as`](<#/doc/feature_test>) | [`202207L`](<#/>) | (C++23) | Gerenciamento explícito de tempo de vida

### Exemplo

Execute este código
```cpp
    #include <complex>
    #include <iostream>
    #include <memory>
    
    int main()
    {
        alignas(std::complex<float>) unsigned char network_datasizeof([std::complex<float>)]
        {
            0xcd, 0xcc, 0xcc, 0x3d, 0xcd, 0xcc, 0x4c, 0x3e
        };
    
    //  auto d = *reinterpret_cast<std::complex<float>*>(network_data);
    //  std::cout << d << '\n'; // UB: network_data does not point to a complex<float>
    
    //  auto d1 = *std::launder(reinterpret_cast<std::complex<float>*>(network_data));
    //  std::cout << d1 << '\n'; // UB: implicitly created objects have dynamic storage
    //                                  duration and have indeterminate value initially,
    //                                  even when an array which provides storage for
    //                                  them has determinate bytes.
    //                                  See also CWG2721.
    
        auto d2 = *std::start_lifetime_as<std::complex<float>>(network_data);
        std::cout << d2 << '\n'; // OK
    }
```

Saída possível:
```
    (0.1,0.2)
```

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    
  * 20.2.6 Gerenciamento explícito de tempo de vida [obj.lifetime]

### Veja também

[ bit_cast](<#/doc/numeric/bit_cast>)(C++20) | reinterpreta a representação de objeto de um tipo como a de outro
(modelo de função)
[ as_bytesas_writable_bytes](<#/doc/container/span/as_bytes>)(C++20) | converte um `span` em uma visão de seus bytes subjacentes
(modelo de função)