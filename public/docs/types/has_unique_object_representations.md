# std::has_unique_object_representations

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct has_unique_object_representations;
```

`std::has_unique_object_representations` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` for [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) e se quaisquer dois objetos do tipo `T` com o mesmo valor tiverem a mesma [representação de objeto](<#/doc/language/objects>), fornece a constante membro `value` igual a true. Para qualquer outro tipo, `value` é false.

Para o propósito deste trait, dois arrays têm o mesmo valor se seus elementos tiverem os mesmos valores, duas classes não-union têm o mesmo valor se seus subobjetos diretos tiverem o mesmo valor, e duas unions têm o mesmo valor se tiverem o mesmo membro ativo e o valor desse membro for o mesmo.

É definido pela implementação quais tipos escalares satisfazem este trait, mas tipos inteiros unsigned(até C++20) que não usam bits de preenchimento têm garantia de ter representações de objeto únicas.

O comportamento é indefinido se `T` for um tipo incompleto diferente de (possivelmente cv-qualified) void ou array de limite desconhecido.

Se o programa adicionar especializações para `std::has_unique_object_representations` ou `std::has_unique_object_representations_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool has_unique_object_representations_v =
has_unique_object_representations<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` tiver representações de objeto únicas, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

Este trait foi introduzido para tornar possível determinar se um tipo pode ser corretamente "hashed" (ter seu hash calculado) ao fazer o hash de sua representação de objeto como um array de bytes.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_has_unique_object_representations`](<#/doc/feature_test>) | [`201606L`](<#/>) | (C++17) | `std::has_unique_object_representations`

### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <type_traits>
    
    struct unpadded
    {
        std::uint32_t a, b;
    };
    
    struct likely_padded
    {
        std::uint8_t c;
        std::uint16_t st;
        std::uint32_t i;
    };
    
    int main()
    {
        // Cada valor de um char corresponde a exatamente uma representação de objeto.
        static_assert(std::has_unique_object_representations_v<char>);
        // Para floats IEC 559, a asserção passa porque o valor NaN tem
        // múltiplas representações de objeto.
        static_assert(!std::has_unique_object_representations_v<float>);
    
        // Deve ser bem-sucedido em qualquer implementação sensata porque unpadded
        // tipicamente não é preenchido, e std::uint32_t não pode conter bits de preenchimento.
        static_assert(std::has_unique_object_representations_v<unpadded>);
        // Falha na maioria das implementações porque bits de preenchimento são inseridos
        // entre os membros de dados c e st com o propósito de alinhar st a 16 bits.
        static_assert(!std::has_unique_object_representations_v<likely_padded>);
    
        // Divergência arquitetural notável:
        static_assert(std::has_unique_object_representations_v<bool>);  // x86
     // static_assert(!std::has_unique_object_representations_v<bool>); // ARM
    }
```

### Veja também

[ is_standard_layout](<#/doc/types/is_standard_layout>)(C++11) | verifica se um tipo é um tipo [standard-layout](<#/doc/language/data_members>)
(template de classe)
[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(template de classe)