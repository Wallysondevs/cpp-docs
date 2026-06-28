# std::basic_simd, std::simd

Definido no cabeçalho `[<simd>](<#/doc/header/simd>)`

```c
template< class T, class Abi = /*native-abi*/<T> >
class basic_simd;
template< class T, /*simd-size-type*/ N = /*simd-size-v*/<T, /*native-abi*/<T>> >
using simd = basic_simd<T, /*deduce-abi-t*/<T, N>>;
```

1) A especialização de `std::basic_simd` é um tipo de dados paralelo. A tag ABI padrão é determinada pela implementação em tempo de compilação.

2) `std::simd` é um modelo de alias que permite aos usuários especificar a largura para um determinado tamanho. A largura padrão é determinada pela implementação em tempo de compilação.

Cada especialização de `basic_simd` é um tipo completo. A especialização é

* _habilitada_ , se `T` for um [tipo vetorizável](<#/doc/numeric/simd>), e existir um valor `M` no intervalo `[`1`, `64`]` tal que `Abi` seja [`_deduce-abi-t_`](<#/doc/numeric/simd>) <T, M>,
* caso contrário _desabilitada_ , se `T` não for um tipo vetorizável,
* caso contrário, é definido pela implementação se tal especialização é habilitada.

Se basic_simd<T, Abi> estiver desabilitada, a especialização terá todos os construtores padrão, destrutor, construtor de cópia e atribuição de cópia deletados. Além disso, apenas os tipos membros abaixo estão presentes.

Se basic_simd<T, Abi> estiver habilitada, basic_simd<T, Abi> é [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>).

### Parâmetros de modelo

- **T** — tipo de elemento; um tipo vetorizável
- **Abi** — [tipo de tag](<#/doc/numeric/simd>) usado para determinar a largura e o armazenamento
- **N** — a largura do tipo de dados paralelo; o número de elementos

### Tipos membros

Tipo | Definição
---|---
`value_type` | `T`
`mask_type` | std::basic_simd_mask<sizeof(T), Abi>
`abi_type` | `Abi`

### Constante membro

Nome | Descrição
---|---
constexpr [std::integral_constant](<#/doc/types/integral_constant>)<`_[simd-size-type](<#/doc/numeric/simd>)_` ,` ` _[simd-size-v](<#/doc/numeric/simd>)_` <T, Abi>> size[static] | a largura de `basic_simd`
(constante membro estática pública)

### Funções membro

[ (constructor)](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/basic_simd/basic_simd&action=edit&redlink=1> "cpp/numeric/simd/basic simd/basic simd \(page does not exist\)") | constrói um objeto `basic_simd`
(função membro pública)
[ operator[]](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/basic_simd/operator_at&action=edit&redlink=1> "cpp/numeric/simd/basic simd/operator at \(page does not exist\)") | acessa o elemento especificado
(função membro pública)
[ operator++operator++(int)operator--operator--(int)](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/basic_simd/operator_mem_arith&action=edit&redlink=1> "cpp/numeric/simd/basic simd/operator mem arith \(page does not exist\)") | incremento e decremento elemento a elemento
(função membro pública)
[ operator!operator~operator+operator-](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/basic_simd/operator_mem_arith2&action=edit&redlink=1> "cpp/numeric/simd/basic simd/operator mem arith2 \(page does not exist\)") | operadores unários elemento a elemento
(função membro pública)

### Funções não-membro

[ operator+operator-operator*operator/operator%operator&operator|operator^operator<&lt;operator&gt;>](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/basic_simd/operator_arith&action=edit&redlink=1> "cpp/numeric/simd/basic simd/operator arith \(page does not exist\)")(C++26) | operadores binários elemento a elemento
(função)
[ operator+=operator-=operator*=operator/=operator%=operator&=operator|=operator^=operator<<=operator>>=](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/basic_simd/operator_compound&action=edit&redlink=1> "cpp/numeric/simd/basic simd/operator compound \(page does not exist\)")(C++26) | operadores binários compostos elemento a elemento
(função)
[ operator==operator!=operator>=operator<=operator>operator<](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/basic_simd/operator_cmp&action=edit&redlink=1> "cpp/numeric/simd/basic simd/operator cmp \(page does not exist\)")(C++26) | operadores relacionais elemento a elemento
(função)
[ _simd-select_(std::basic_simd)](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/basic_simd/simd_select&action=edit&redlink=1> "cpp/numeric/simd/basic simd/simd select \(page does not exist\)")(C++26) | especializa a seleção elemento a elemento para `simd_select`
(função apenas para exposição*)

### Guia de dedução

```cpp
template< class R, class... Ts >
basic_simd( R&& r, Ts... ) -> /* see below */;  // (desde C++26)
```

O guia de dedução está presente apenas se:

* `R` modela [`contiguous_range`](<#/doc/ranges/contiguous_range>) e [`sized_range`](<#/doc/ranges/sized_range>), e
* [ranges::size](<#/doc/ranges/size>)(r) for uma [expressão constante](<#/doc/language/constant_expression>).

O tipo deduzido é equivalente a std::simd<[ranges::range_value_t](<#/doc/ranges/range_size_t>)&lt;R&gt;, [ranges::size](<#/doc/ranges/size>)(r)>.

### Observações

Recomenda-se que as implementações suportem conversões explícitas entre especializações habilitadas de `basic_simd` e tipos apropriados definidos pela implementação. Esses tipos apropriados são tipos de vetor não-padrão que estão disponíveis na implementação.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ basic_simd_mask](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/basic_simd_mask&action=edit&redlink=1> "cpp/numeric/simd/basic simd mask \(page does not exist\)")(C++26) | tipo de dados paralelo com o tipo de elemento bool
(modelo de classe)
[ simd_mask](<https://en.cppreference.com/mwiki/index.php?title=cpp/numeric/simd/basic_simd_mask&action=edit&redlink=1> "cpp/numeric/simd/basic simd mask \(page does not exist\)")(C++26) | modelo de alias de conveniência para `basic_simd_mask` que pode especificar sua largura
(modelo de alias)
[ valarray](<#/doc/numeric/valarray>) | arrays numéricos, máscaras de array e fatias de array
(modelo de classe)