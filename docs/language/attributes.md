# Sequência de especificadores de atributo (desde C++11)

Introduz atributos definidos pela implementação para tipos, objetos, código, etc.

### Sintaxe

---
`[[` attribute-list `]]` | | (desde C++11)
---|---|---
`[[` `using` attribute-namespace `:` attribute-list `]]` | | (desde C++17)

onde attribute-list é uma sequência separada por vírgulas de zero ou mais atributos (possivelmente terminando com uma elipse `...` indicando uma [expansão de pacote](<#/doc/language/parameter_pack>))

---
identifier | (1) |
---|---|---
attribute-namespace `::` identifier | (2) |
identifier `(` argument-list ﻿(optional) `)` | (3) |
attribute-namespace `::` identifier `(` argument-list ﻿(optional) `)` | (4) |

onde attribute-namespace é um identificador e argument-list é uma sequência de tokens onde parênteses, colchetes e chaves são balanceados (balanced-token-seq).

1) Atributo simples, como [[noreturn]].

2) Atributo com um namespace, como [[gnu::unused]].

3) Atributo com argumentos, como [[deprecated("because")]].

4) Atributo com um namespace e uma lista de argumentos.

Se `using namespace:` aparecer no início de uma lista de atributos, nenhum outro atributo na lista de atributos pode especificar um namespace: o namespace especificado em um using se aplica a todos eles:
```cpp
    [[using CC: opt(1), debug]] // same as [[CC::opt(1), CC::debug]]
    [[using CC: CC::opt(1)]] // error: cannot combine using and scoped attribute
```

| (desde C++17)

### Explicação

Atributos fornecem a sintaxe padrão unificada para extensões de linguagem definidas pela implementação, como as extensões de linguagem GNU e IBM `__attribute__((...))`, a extensão Microsoft `__declspec()`, etc.

Um atributo pode ser usado em quase todos os lugares no programa C++, e pode ser aplicado a quase tudo: a tipos, a variáveis, a funções, a nomes, a blocos de código, a unidades de tradução inteiras, embora cada atributo particular seja válido apenas onde é permitido pela implementação: `[[expect_true]]` poderia ser um atributo que só pode ser usado com um if, e não com uma declaração de classe. `[[omp::parallel()]]` poderia ser um atributo que se aplica a um bloco de código ou a um loop for, mas não ao tipo int, etc (note que estes dois atributos são exemplos fictícios, veja abaixo os atributos padrão e alguns não-padrão).

Em declarações, atributos podem aparecer tanto antes da declaração completa quanto diretamente após o nome da entidade que é declarada, caso em que são combinados. Na maioria das outras situações, atributos se aplicam à entidade diretamente precedente.

O [especificador alignas](<#/doc/language/alignas>) faz parte da sequência de especificadores de atributo, embora tenha uma sintaxe diferente. Ele pode aparecer onde os atributos `[[...]]` aparecem e pode se misturar com eles (desde que seja usado onde alignas é permitido).

Dois tokens de colchete esquerdo consecutivos (`[[`) só podem aparecer ao introduzir um especificador de atributo ou dentro de um argumento de atributo.
```cpp
    void f()
    {
        int y[3];
        y[[] { return 0; }()] = 1;  // error
        int i [[cats::meow([[]])]]; // OK
    }
```

Além dos atributos padrão listados abaixo, as implementações podem suportar atributos não-padrão arbitrários com comportamento definido pela implementação. Todos os atributos desconhecidos por uma implementação são ignorados sem causar um erro.(desde C++17)

Um atributo sem attribute-namespace e um attribute-namespace cujo nome é `std` ou `std` seguido por um ou mais dígitos é reservado para padronização futura. Ou seja, todo atributo não-padrão está no attribute-namespace fornecido pela implementação, por exemplo, `[[gnu::may_alias]]`, `[[clang::trivial_abi]]`, e `[[msvc::noop_dtor]]`. | (desde C++20)

### Atributos padrão

Os seguintes atributos são definidos pelo padrão C++.

Atributos padrão não podem ser ignorados sintaticamente: eles não podem conter erros de sintaxe, devem ser aplicados ao alvo correto, e as entidades nos argumentos devem ser [ODR-use](<#/doc/language/definition>).

Atributos padrão também não podem ser ignorados semanticamente: o comportamento com todas as instâncias de um atributo padrão particular removidas teria sido um comportamento conforme para o programa original com o atributo presente.

`[[[noreturn](<#/doc/language/attributes/noreturn>)]]`(C++11) | indica que a função não retorna
(especificador de atributo)
`[[[carries_dependency](<#/doc/language/attributes/carries_dependency>)]]`(C++11) | indica que a cadeia de dependência em release-consume [std::memory_order](<#/doc/atomic/memory_order>) se propaga para dentro e para fora da função
(especificador de atributo)
`[[[deprecated](<#/doc/language/attributes/deprecated>)]]`(C++14)
`[[[deprecated](<#/doc/language/attributes/deprecated>)("_reason_ ")]]`(C++14) | indica que o uso do nome ou entidade declarada com este atributo é permitido, mas desencorajado por alguma razão
(especificador de atributo)
`[[[fallthrough](<#/doc/language/attributes/fallthrough>)]]`(C++17) | indica que a passagem direta (fall through) do rótulo de caso anterior é intencional e não deve ser diagnosticada por um compilador que avisa sobre passagens diretas
(especificador de atributo)
`[[[maybe_unused](<#/doc/language/attributes/maybe_unused>)]]`(C++17) | suprime avisos do compilador sobre entidades não utilizadas, se houver
(especificador de atributo)
`[[[nodiscard](<#/doc/language/attributes/nodiscard>)]]`(C++17)
`[[[nodiscard](<#/doc/language/attributes/nodiscard>)("_reason_ ")]]`(C++20) | incentiva o compilador a emitir um aviso se o valor de retorno for descartado
(especificador de atributo)
`[[[likely](<#/doc/language/attributes/likely>)]]`(C++20)
`[[[unlikely](<#/doc/language/attributes/likely>)]]`(C++20) | indica que o compilador deve otimizar para o caso em que um caminho de execução através de uma instrução é mais ou menos provável do que qualquer outro caminho de execução
(especificador de atributo)
`[[[no_unique_address](<#/doc/language/attributes/no_unique_address>)]]`(C++20) | indica que um membro de dados não estático não precisa ter um endereço distinto de todos os outros membros de dados não estáticos de sua classe
(especificador de atributo)
`[[[assume](<#/doc/language/attributes/assume>)(_expression_)]]`(C++23) | especifica que a _expression_ sempre será avaliada como verdadeira em um dado ponto
(especificador de atributo)
`[[[indeterminate](<#/doc/language/attributes/indeterminate>)]]`(C++26) | especifica que um objeto tem um valor indeterminado se não for inicializado
(especificador de atributo)
`[[[optimize_for_synchronized](<#/doc/language/attributes/optimize_for_synchronized>)]]`(TM TS) | indica que a definição da função deve ser otimizada para invocação a partir de uma [instrução sincronizada](<#/doc/language/transactional_memory>)
(especificador de atributo)

### Notas

A presença de cada atributo individual em uma dada plataforma pode ser verificada com a macro de pré-processador [`__has_cpp_attribute`](<#/doc/feature_test>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_attributes`](<#/doc/feature_test>) | [`200809L`](<#/>) | (C++11) | Atributos
[`__cpp_namespace_attributes`](<#/doc/feature_test>) | [`201411L`](<#/>) | (C++17) | Atributos para [namespaces](<#/doc/language/namespace>)

### Exemplo

Execute este código
```cpp
    [[gnu::always_inline]] [[gnu::hot]] [[gnu::const]] [[nodiscard]]
    inline int f(); // declara f com quatro atributos
     
    [[gnu::always_inline, gnu::const, gnu::hot, nodiscard]]
    int f(); // o mesmo que acima, mas usa um único especificador de atributo que contém quatro atributos
     
    // C++17:
    [[using gnu : const, always_inline, hot]] [[nodiscard]]
    int f[[gnu::always_inline]](); // um atributo pode aparecer em múltiplos especificadores
     
    int f() { return 0; }
     
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 2079](<https://cplusplus.github.io/CWG/issues/2079.html>) | C++11 | `[[` não podia aparecer dentro de um argumento de atributo | permitido
[CWG 2538](<https://cplusplus.github.io/CWG/issues/2538.html>) | C++11 | não estava claro se atributos padrão podem ser ignorados sintaticamente | proibido
[CWG 2695](<https://cplusplus.github.io/CWG/issues/2695.html>) | C++11 | não estava claro se atributos padrão podem ser ignorados semanticamente | proibido
[P2156R1](<https://wg21.link/P2156R1>) | C++11 | cada atributo padrão era exigido para aparecer no máximo uma vez em uma attribute-list | não exigido

### Veja também

[`__has_cpp_attribute`](<#/doc/feature_test>) \- verifica a presença de um atributo
---
[documentação C](<#/>) para sequência de especificadores de atributo

### Links externos

1.  | [Atributos no GCC](<https://gcc.gnu.org/onlinedocs/gcc/Attribute-Syntax.html#Attribute-Syntax>). Estes atributos podem ser usados como `[[gnu::...]]`, [Veja no SO](<https://stackoverflow.com/questions/54639524/which-gnu-attributes-have-c11-syntax#comment96071307_54639524>).
---|---
2.  | [Atributos no Clang](<https://clang.llvm.org/docs/AttributeReference.html>).
3.  | [Atributos no MSVC](<https://learn.microsoft.com/en-us/cpp/cpp/attributes#microsoft-specific-attributes>).