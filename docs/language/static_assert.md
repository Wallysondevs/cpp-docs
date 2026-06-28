# declaração static_assert (desde C++11)

Realiza verificação de asserção em tempo de compilação.

### Sintaxe

---
```cpp
`static_assert(` bool-constexpr `,` unevaluated-string `)`  // (1)
`static_assert(` bool-constexpr `)`  // (2) (desde C++17)
`static_assert(` bool-constexpr `,` constant-expression `)`  // (3) (desde C++26)
```

Declara uma asserção estática. Se a asserção falhar, o programa é malformado e uma mensagem de erro de diagnóstico pode ser gerada.

1) Uma asserção estática com mensagem de erro fixa.

2) Uma asserção estática sem mensagem de erro.

3) Uma asserção estática com mensagem de erro gerada pelo usuário.

Esta sintaxe só pode ser correspondida se a sintaxe ([1](<#/doc/language/static_assert>)) não corresponder.

### Explicação

- **bool-constexpr** — | uma [expressão constante convertida contextualmente do tipo bool](<#/doc/language/constant_expression>). Conversões embutidas não são permitidas, exceto para [conversões integrais](<#/doc/language/implicit_cast>) não-[restritivas](<#/doc/language/list_initialization>) para bool. | (até C++23)
uma expressão [convertida contextualmente para bool](<#/doc/language/implicit_cast>) onde a conversão é uma [expressão constante](<#/doc/language/constant_expression>) | (desde C++23)
- **unevaluated-string** — um [literal de string não avaliado](<#/doc/language/string_literal>) que aparecerá como a mensagem de erro
- **constant-expression** — uma [expressão constante](<#/doc/language/constant_expression>) `msg` satisfazendo todas as seguintes condições:

  * `msg.size()` é implicitamente conversível para [std::size_t](<#/doc/types/size_t>).
  * `msg.data()` é implicitamente conversível para `const char*`.

Uma declaração `static_assert` pode aparecer em escopo de namespace e de bloco (como uma [declaração de bloco](<#/doc/language/declarations>)) e dentro de um corpo de classe (como uma [declaração de membro](<#/doc/language/class>)).

Se `bool-constexpr` for bem-formado e avaliar para `true`, ou for avaliado no contexto de uma definição de template e o template não for instanciado, esta declaração não tem efeito. Caso contrário, um erro em tempo de compilação é emitido, e a mensagem fornecida pelo usuário, se houver, é incluída na mensagem de diagnóstico.

O texto da mensagem fornecida pelo usuário é determinado da seguinte forma:

  * Se a mensagem corresponder aos requisitos sintáticos de `unevaluated-string`, o texto da mensagem é o texto do `unevaluated-string`.

  * Caso contrário, dados os seguintes valores:

  * Seja `msg` o valor da `constant-expression`.
  * Seja `len` o valor de `msg.size()`, que deve ser uma [expressão constante convertida](<#/doc/language/constant_expression>) do tipo [std::size_t](<#/doc/types/size_t>).
  * Seja `ptr` a expressão `msg.data()`, [implicitamente convertida](<#/doc/language/implicit_cast>) para `const char*`. `ptr` deve ser uma [core constant expression](<#/doc/language/constant_expression>).

     O texto da mensagem é formado pela sequência de `len` [unidades de código](<#/doc/language/charset>), começando em `ptr`, da [codificação literal ordinária](<#/doc/language/charset>). Para cada inteiro `i` em `[`0`, `len`)`, `ptr[i]` deve ser uma [expressão constante integral](<#/doc/language/constant_expression>).
| (desde C++26)

### Notas

O padrão não exige que um compilador imprima o texto literal da [mensagem de erro](<#/doc/language/static_assert>), embora os compiladores geralmente o façam o máximo possível.

Como a mensagem de erro deve ser um literal de string, ela não pode conter informações dinâmicas ou mesmo uma [expressão constante](<#/doc/language/constant_expression>) que não seja um literal de string em si. Em particular, ela não pode conter o [nome](<#/doc/language/name>) do [argumento de tipo de template](<#/doc/language/template_parameters>). | (até C++26)
Macro de teste de recurso | Valor | Padrão | Recurso
[`__cpp_static_assert`](<#/doc/feature_test>) | [`200410L`](<#/>) | (C++11) | static_assert (sintaxe ([1](<#/doc/language/static_assert>)))
[`201411L`](<#/>) | (C++17) | static_assert de argumento único (sintaxe ([2](<#/doc/language/static_assert>)))
[`202306L`](<#/>) | (C++26) | mensagens de erro geradas pelo usuário (sintaxe ([3](<#/doc/language/static_assert>)))

### Palavras-chave

[`static_assert`](<#/doc/keyword/static_assert>)

### Exemplo

Execute este código
```cpp
    #include <format>
    #include <type_traits>
    
    static_assert(03301 == 1729); // since C++17 the message string is optional
    
    template<class T>
    void swap(T& a, T& b) noexcept
    {
        static_assert(std::is_copy_constructible_v<T>,
                      "Swap requires copying");
        static_assert(std::is_nothrow_copy_constructible_v<T> &&
                      std::is_nothrow_copy_assignable_v<T>,
                      "Swap requires nothrow copy/assign");
        auto c = b;
        b = a;
        a = c;
    }
    
    template<class T>
    struct data_structure
    {
        static_assert(std::is_default_constructible_v<T>,
                      "Data structure requires default-constructible elements");
    };
    
    template<class>
    constexpr bool dependent_false = false; // workaround before CWG2518/P2593R1
    
    template<class T>
    struct bad_type
    {
        static_assert(dependent_false<T>, "error on instantiation, workaround");
        static_assert(false, "error on instantiation"); // OK because of CWG2518/P2593R1
    };
    
    struct no_copy
    {
        no_copy(const no_copy&) = delete;
        no_copy() = default;
    };
    
    struct no_default
    {
        no_default() = delete;
    };
    
    #if __cpp_static_assert >= 202306L
    // Not real C++ yet (std::format should be constexpr to work):
    static_assert(sizeof(int) == 4, std::format("Expected 4, got {}", sizeof(int)));
    #endif
    
    int main()
    {
        int a, b;
        swap(a, b);
    
        no_copy nc_a, nc_b;
        swap(nc_a, nc_b); // 1
    
        [[maybe_unused]] data_structure<int> ds_ok;
        [[maybe_unused]] data_structure<no_default> ds_error; // 2
    }
```

Saída possível:
```
    1: error: static assertion failed: Swap requires copying
    2: error: static assertion failed: Data structure requires default-constructible elements
    3: error: static assertion failed: Expected 4, got 2
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2039](<https://cplusplus.github.io/CWG/issues/2039.html>) | C++11 | apenas a expressão antes da conversão é exigida como constante | a conversão também deve ser válida em uma expressão constante
[CWG 2518](<https://cplusplus.github.io/CWG/issues/2518.html>) ([P2593R1](<https://wg21.link/P2593R1>)) | C++11 | `static_assert(false, "");` não instanciado era malformado | tornado bem-formado

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

  * 9.1 Preâmbulo [dcl.pre] (p: 10)

  * Padrão C++20 (ISO/IEC 14882:2020):

  * 9.1 Preâmbulo [dcl.pre] (p: 6)

  * Padrão C++17 (ISO/IEC 14882:2017):

  * 10 Declarações [dcl.dcl] (p: 6)

  * Padrão C++14 (ISO/IEC 14882:2014):

  * 7 Declarações [dcl.dcl] (p: 4)

  * Padrão C++11 (ISO/IEC 14882:2011):

  * 7 Declarações [dcl.dcl] (p: 4)

### Veja também

[ #error](<#/doc/preprocessor/error>) | mostra a mensagem de erro fornecida e torna o programa malformado
(diretiva de pré-processamento)
[ assert](<#/doc/error/assert>) | aborta o programa se a condição especificada pelo usuário não for verdadeira. Pode ser desabilitado para builds de lançamento.
(macro de função)
[ enable_if](<#/doc/types/enable_if>)(C++11) | remove condicionalmente uma sobrecarga de função ou especialização de template da resolução de sobrecarga
(template de classe)
[**Type traits**](<#/doc/meta>) (C++11) | definem interfaces baseadas em template em tempo de compilação para consultar as propriedades de tipos
[Documentação C](<#/>) para asserção estática