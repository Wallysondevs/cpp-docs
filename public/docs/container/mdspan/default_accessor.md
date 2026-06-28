# std::default_accessor

Definido no cabeçalho `[<mdspan>](<#/doc/header/mdspan>)`

```c
template< class ElementType >
class default_accessor;
```

Uma especialização do template de classe `std::default_accessor` é a [AccessorPolicy](<#/doc/named_req/AccessorPolicy>) padrão usada por std::mdspan se nenhuma política de acesso especificada pelo usuário for fornecida.

Cada especialização de `default_accessor` modela [`semiregular`](<#/doc/concepts/semiregular>) e é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>).

### Parâmetros de template

- **ElementType** — o tipo do elemento. Deve ser um tipo de objeto completo que não seja nem um tipo de classe abstrata nem um tipo de array. Caso contrário, o programa é malformado

### Tipos de membro

Tipo de membro | Definição
---|---
`offset_policy` | `default_accessor`
`element_type` | `ElementType`
`reference` | `ElementType&`
`data_handle_type` | `ElementType*`

### Funções de membro

(construtor) | constrói um `default_accessor`
(função de membro pública)
access | retorna o n-ésimo elemento fornecido pelos argumentos
(função de membro pública)
offset | retorna um data handle avançado por um valor de offset
(função de membro pública)

## std::default_accessor::default_accessor

```cpp
constexpr default_accessor() noexcept = default;  // (1)
template< class OtherElementType >
constexpr default_accessor( default_accessor<OtherElementType> ) noexcept {}  // (2)
```

1) Constrói um `default_accessor` por padrão.

2) Constrói um `default_accessor` a partir de default_accessor&lt;OtherElementType&gt;. O construtor não tem efeito visível. Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_convertible_v](<#/doc/types/is_convertible>)<OtherElementType(*)[], element_type(*)[]> for verdadeiro.

## std::default_accessor::access

constexpr reference access( data_handle_type p, [std::size_t](<#/doc/types/size_t>) i ) const noexcept;

Equivalente a return p[i];.

## std::default_accessor::offset

constexpr data_handle_type offset( data_handle_type p, [std::size_t](<#/doc/types/size_t>) i ) const noexcept;

Equivalente a return p + i;.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo