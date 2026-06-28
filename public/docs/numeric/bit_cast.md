# std::bit_cast

Definido no cabeçalho `[<bit>](<#/doc/header/bit>)`

```c
template< class To, class From >
constexpr To bit_cast( const From& from ) noexcept;
```

Obtém um valor do tipo `To` reinterpretando a representação de objeto de `From`. Cada bit na [representação de valor](<#/doc/language/objects>) do objeto `To` retornado é igual ao bit correspondente na representação de [objeto](<#/doc/language/objects>) de from. Os valores dos bits de preenchimento no objeto `To` retornado são não especificados.

Se não houver valor do tipo `To` correspondente à representação de valor produzida, o comportamento é indefinido. Se houver múltiplos valores desse tipo, qual valor é produzido é não especificado.

Um bit na representação de valor do resultado é _indeterminado_ se ele

*   não corresponde a um bit na representação de valor de `From` (ou seja, corresponde a um bit de preenchimento), ou
*   corresponde a um bit de um objeto que(até C++26)para o qual o menor objeto envolvente(desde C++26) não está dentro de seu [tempo de vida](<#/doc/language/lifetime>), ou
*   tem um [valor indeterminado](<#/doc/language/default_initialization>).

Um bit na representação de valor do resultado é _errôneo_ se ele corresponde a um bit para o qual o menor objeto envolvente tem um [valor errôneo](<#/doc/language/default_initialization>). | (desde C++26)

Para cada bit na representação de valor do resultado que é indeterminado, o menor objeto contendo esse bit tem um valor indeterminado; o comportamento é indefinido a menos que esse objeto seja de um [tipo amigável à não inicialização](<#/doc/language/default_initialization>). O resultado não contém, de outra forma, quaisquer valores indeterminados. | (até C++26)
Para cada bit b na representação de valor do resultado que é indeterminado ou errôneo, seja u o menor objeto que envolve b:

*   Se u é de [tipo amigável à não inicialização](<#/doc/language/default_initialization>), u tem um valor indeterminado se qualquer um dos bits em sua representação de valor for indeterminado, ou, caso contrário, tem um valor errôneo.
*   Caso contrário, se b é indeterminado, o comportamento é indefinido.
*   Caso contrário, o comportamento é [errôneo](<#/doc/language/ub>), e o resultado é conforme especificado acima.

| (desde C++26)

O resultado não contém, de outra forma, quaisquer valores indeterminados ou errôneos.

Esta sobrecarga participa da resolução de sobrecarga apenas se `sizeof(To) == sizeof(From)` e ambos `To` e `From` são tipos [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>).

Este modelo de função é `constexpr` se e somente se cada um de `To`, `From` e os tipos de todos os subobjetos de `To` e `From`:

*   não é um tipo union;
*   não é um tipo ponteiro;
*   não é um tipo ponteiro para membro;
*   não é um tipo qualificado como volatile; e
*   não tem membro de dados não estático de tipo referência.

### Parâmetros

- **from** — a fonte de bits para o valor de retorno

### Valor de retorno

Um objeto do tipo `To` cuja representação de valor é conforme descrito acima.

### Possível implementação

Para implementar `std::bit_cast`, ignorando o fato de que é [constexpr](<#/doc/language/constexpr>), [std::memcpy](<#/doc/string/byte/memcpy>) pode ser usado, quando necessário, para interpretar a representação de objeto como a de outro tipo:
```cpp
    template<class To, class From>
    std::enable_if_t<
        sizeof(To) == sizeof(From) &&
        std::is_trivially_copyable_v<From> &&
        std::is_trivially_copyable_v<To>,
        To>
    // constexpr support needs compiler magic
    bit_cast(const From& src) noexcept
    {
        static_assert(std::is_trivially_constructible_v<To>,
            "This implementation additionally requires "
            "destination type to be trivially constructible");
    
        To dst;
        std::memcpy(&dst, &src, sizeof(To));
        return dst;
    }
```

### Notas

[`reinterpret_cast`](<#/doc/language/reinterpret_cast>) (ou [cast explícito](<#/doc/language/explicit_cast>) equivalente) entre tipos ponteiro ou referência não deve ser usado para reinterpretar a representação de objeto na maioria dos casos devido à [regra de aliasing de tipo](<#/doc/language/reinterpret_cast>).

Macro de [teste de funcionalidade](<#/doc/utility/feature_test>) | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_bit_cast`](<#/doc/feature_test>) | [`201806L`](<#/>) | (C++20) | [`std::bit_cast`](<#/doc/numeric/bit_cast>)

### Exemplo

Execute este código
```cpp
    #include <bit>
    #include <cstdint>
    #include <iostream>
    
    constexpr double f64v = 19880124.0; 
    constexpr auto u64v = std::bit_cast<std::uint64_t>(f64v);
    static_assert(std::bit_cast<double>(u64v) == f64v); // round-trip
    
    constexpr std::uint64_t u64v2 = 0x3fe9000000000000ull;
    constexpr auto f64v2 = std::bit_cast<double>(u64v2);
    static_assert(std::bit_cast<std::uint64_t>(f64v2) == u64v2); // round-trip
    
    int main()
    {
        std::cout
            << "std::bit_cast<std::uint64_t>(" << std::fixed << f64v << ") == 0x"
            << std::hex << u64v << '\n'
            << "std::bit_cast<double>(0x" << std::hex << u64v2 << ") == "
            << std::fixed << f64v2 << '\n';
    }
```

Saída possível:
```
    std::bit_cast<std::uint64_t>(19880124.000000) == 0x4172f58bc0000000
    std::bit_cast<double>(0x3fe9000000000000) == 0.781250
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[CWG 2482](<https://cplusplus.github.io/CWG/issues/2482.html>)
([P1272R4](<https://wg21.link/P1272R4>)) | C++20 | era não especificado se UB ocorreria ao envolver bits indeterminados | especificado

### Veja também

[ start_lifetime_asstart_lifetime_as_array](<#/doc/memory/start_lifetime_as>)(C++23) | cria implicitamente objetos em um armazenamento dado com a representação de objeto reutilizada
(modelo de função)
\*\[Valor]: O ano/mês em que a funcionalidade foi adotada. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para a funcionalidade dada.
\*\[Padrão]: Padrão no qual a funcionalidade é introduzida; DR significa relatório de defeito contra essa revisão