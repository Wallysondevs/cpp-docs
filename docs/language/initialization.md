# Inicialização

A _inicialização_ de uma variável fornece seu valor inicial no momento da construção.

O valor inicial pode ser fornecido na seção de inicializador de um [declarador](<#/doc/language/declarations>) ou de uma [expressão new](<#/doc/language/new>). Também ocorre durante chamadas de função: parâmetros de função e os valores de retorno de função também são inicializados.

### Inicializadores

Para cada declarador, o _inicializador_ (se existir) pode ser um dos seguintes:

---
`=` expression | (1) |
`= {}`
`= {` initializer-list `}`
`= {` designated-initializer-list `}` | (2) |

(desde C++20)
`(` expression-list `)`
`(` initializer-list `)` | (3) | (até C++11)
(desde C++11)
`{}`
`{` initializer-list `}`
`{` designated-initializer-list `}` | (4) | (desde C++11)
(desde C++11)
(desde C++20)

1) Sintaxe de inicialização por cópia.

2) Sintaxe de inicialização de agregado. (até C++11) Sintaxe de inicialização por lista. (desde C++11)

3) Sintaxe de inicialização direta.

4) Sintaxe de inicialização por lista.

- **expression** — qualquer expressão (exceto [expressões de vírgula](<#/doc/language/operator_other>) não parentesizadas)
- **expression-list** — uma lista de expressões separadas por vírgulas (exceto expressões de vírgula não parentesizadas)
- **initializer-list** — uma lista de cláusulas de inicializador separadas por vírgulas (veja abaixo)
- **designated-initializer-list** — uma lista de [cláusulas de inicializador designadas](<#/doc/language/aggregate_initialization>) separadas por vírgulas

Uma _cláusula de inicializador_ pode ser uma das seguintes:

---
expression | (1) |
---|---|---
`{}` | (2) |
`{` initializer-list `}` | (3) |
`{` designated-initializer-list `}` | (4) | (desde C++20)

As sintaxes (2-4) são coletivamente chamadas de _lista de inicializadores entre chaves_.

#### Semântica do inicializador

Se nenhum inicializador for especificado para um objeto, o objeto é [inicializado por padrão](<#/doc/language/default_initialization>). Se nenhum inicializador for especificado para uma [referência](<#/doc/language/reference>), o programa é malformado.

Se o inicializador especificado para um objeto for () (não pode aparecer em declaradores devido à restrição de sintaxe), o objeto é [inicializado por valor](<#/doc/language/value_initialization>). Se o inicializador especificado para uma referência for (), o programa é malformado.

A semântica dos inicializadores é a seguinte:

*   Se a entidade sendo inicializada for uma referência, veja [inicialização de referência](<#/doc/language/reference_initialization>).
*   Caso contrário, a entidade sendo inicializada é um objeto. Dado o tipo do objeto como `T`:

*   Se o inicializador for da sintaxe (1), o objeto é [inicializado por cópia](<#/doc/language/copy_initialization>).

*   Se o inicializador for da sintaxe (2):

*   Se `T` for um [agregado](<#/doc/language/aggregate_initialization>), [inicialização de agregado](<#/doc/language/aggregate_initialization>) se aplica.
*   Se `T` for um [tipo escalar](<#/doc/named_req/ScalarType>), T x = { a }; é equivalente a T x = a;.
*   Caso contrário, o programa é malformado.

| (até C++11)

*   Se o inicializador for da sintaxe (2) ou (4), o objeto é [inicializado por lista](<#/doc/language/list_initialization>).

| (desde C++11)

*   Se o inicializador for da sintaxe (3), o objeto é [inicializado diretamente](<#/doc/language/direct_initialization>).

```cpp
    #include <string>
     
    std::string s1;           // inicialização por padrão
    std::string s2();         // NÃO é uma inicialização!
                              // na verdade declara uma função “s2”
                              // sem parâmetros e que retorna std::string
    std::string s3 = "hello"; // inicialização por cópia
    std::string s4("hello");  // inicialização direta
    std::string s5{'a'};      // inicialização por lista (desde C++11)
     
    char a[3] = {'a', 'b'}; // inicialização de agregado
                            // (parte da inicialização por lista desde C++11)
    char& c = a[0];         // inicialização de referência
```

### Variáveis não-locais

Todas as variáveis não-locais com [duração de armazenamento](<#/doc/language/storage_duration>) estática são inicializadas como parte da inicialização do programa, antes que a execução da [função main](<#/doc/language/main_function>) comece (a menos que adiada, veja abaixo). Todas as variáveis não-locais com duração de armazenamento thread-local são inicializadas como parte do lançamento da thread, sequenciadas antes que a execução da função da thread comece. Para ambas as classes de variáveis, a inicialização ocorre em dois estágios distintos:

#### Inicialização estática

Existem duas formas de inicialização estática:

1) Se possível, [inicialização constante](<#/doc/language/constant_initialization>) é aplicada.

2) Caso contrário, variáveis estáticas não-locais e thread-local são [zero-inicializadas](<#/doc/language/zero_initialization>).

Na prática:

*   A inicialização constante é geralmente aplicada em tempo de compilação. Representações de objetos pré-calculadas são armazenadas como parte da imagem do programa. Se o compilador não fizer isso, ele ainda deve garantir que a inicialização ocorra antes de qualquer inicialização dinâmica.
*   Variáveis a serem zero-inicializadas são colocadas no segmento `.bss` da imagem do programa, que não ocupa espaço em disco e é zerado pelo SO ao carregar o programa.

#### Inicialização dinâmica

Após toda a inicialização estática ser concluída, a inicialização dinâmica de variáveis não-locais ocorre nas seguintes situações:

1) _Inicialização dinâmica não ordenada_, que se aplica apenas a [membros de dados estáticos](<#/doc/language/static>) de template de classe (estáticos/thread-local) e [templates de variável](<#/doc/language/variable_template>) (desde C++14) que não são [explicitamente especializados](<#/doc/language/template_specialization>). A inicialização de tais variáveis estáticas é sequenciada de forma indeterminada em relação a todas as outras inicializações dinâmicas, exceto se o programa iniciar uma thread antes que uma variável seja inicializada, caso em que sua inicialização não é sequenciada (desde C++17). A inicialização de tais variáveis thread-local não é sequenciada em relação a todas as outras inicializações dinâmicas.

2) _Inicialização dinâmica parcialmente ordenada_, que se aplica a todas as variáveis inline que não são uma especialização implicitamente ou explicitamente instanciada. Se uma variável V parcialmente ordenada for definida antes de uma variável W ordenada ou parcialmente ordenada em cada unidade de tradução, a inicialização de V é sequenciada antes da inicialização de W (ou acontece-antes, se o programa iniciar uma thread). | (desde C++17)

3) _Inicialização dinâmica ordenada_, que se aplica a todas as outras variáveis não-locais: dentro de uma única unidade de tradução, a inicialização dessas variáveis é sempre [sequenciada](<#/doc/language/eval_order>) na ordem exata em que suas definições aparecem no código-fonte. A inicialização de variáveis estáticas em diferentes unidades de tradução é sequenciada de forma indeterminada. A inicialização de variáveis thread-local em diferentes unidades de tradução não é sequenciada.

Se a inicialização de uma variável não-local com duração de armazenamento estática ou de thread sair via uma exceção, [std::terminate](<#/doc/error/terminate>) é chamada.

#### Inicialização dinâmica antecipada

Os compiladores podem inicializar variáveis dinamicamente inicializadas como parte da inicialização estática (essencialmente, em tempo de compilação), se as seguintes condições forem ambas verdadeiras:

1) a versão dinâmica da inicialização não altera o valor de nenhum outro objeto de escopo de namespace antes de sua inicialização

2) a versão estática da inicialização produz o mesmo valor na variável inicializada que seria produzido pela inicialização dinâmica se todas as variáveis não exigidas para serem inicializadas estaticamente fossem inicializadas dinamicamente.

Devido à regra acima, se a inicialização de algum objeto `o1` se refere a um objeto `o2` de escopo de namespace, que potencialmente requer inicialização dinâmica, mas é definido posteriormente na mesma unidade de tradução, é não especificado se o valor de `o2` usado será o valor do `o2` totalmente inicializado (porque o compilador promoveu a inicialização de `o2` para tempo de compilação) ou será o valor de `o2` meramente zero-inicializado.
```cpp
    inline double fd() { return 1.0; }
     
    extern double d1;
     
    double d2 = d1;   // não especificado:
                      // inicializado dinamicamente para 0.0 se d1 for inicializado dinamicamente, ou
                      // inicializado dinamicamente para 1.0 se d1 for inicializado estaticamente, ou
                      // inicializado estaticamente para 0.0 (porque esse seria seu valor
                      // se ambas as variáveis fossem inicializadas dinamicamente)
     
    double d1 = fd(); // pode ser inicializado estaticamente ou dinamicamente para 1.0
```

#### Inicialização dinâmica adiada

É definido pela implementação se a inicialização dinâmica acontece-antes da primeira instrução da função main (para estáticos) ou da função inicial da thread (para thread-locals), ou se é adiada para acontecer depois.

Se a inicialização de uma variável não-inline (desde C++17) for adiada para acontecer após a primeira instrução da função main/thread, ela acontece antes do primeiro [uso ODR](<#/doc/language/definition>) de qualquer variável com duração de armazenamento estática/de thread definida na mesma unidade de tradução que a variável a ser inicializada. Se nenhuma variável ou função for usada ODR de uma determinada unidade de tradução, as variáveis não-locais definidas nessa unidade de tradução podem nunca ser inicializadas (isso modela o comportamento de uma biblioteca dinâmica sob demanda). No entanto, enquanto algo de uma unidade de tradução for usado ODR, todas as variáveis não-locais cuja inicialização ou destruição tenha efeitos colaterais serão inicializadas mesmo que não sejam usadas no programa.

Se a inicialização de uma variável inline for adiada, ela acontece antes do primeiro [uso ODR](<#/doc/language/definition>) dessa variável específica. | (desde C++17)
```cpp
    // ============
    // == Arquivo 1 ==
     
    #include "a.h"
    #include "b.h"
     
    B b;
    A::A() { b.Use(); }
     
    // ============
    // == Arquivo 2 ==
     
    #include "a.h"
     
    A a;
     
    // ============
    // == Arquivo 3 ==
     
    #include "a.h"
    #include "b.h"
     
    extern A a;
    extern B b;
     
    int main()
    {
        a.Use();
        b.Use();
    }
     
    // Se 'a' for inicializado antes de 'main' ser iniciada, 'b' ainda pode estar não inicializado
    // no ponto onde A::A() o usa (porque a inicialização dinâmica é
    // sequenciada de forma indeterminada entre unidades de tradução)
     
    // Se 'a' for inicializado em algum ponto após a primeira instrução de 'main' (que usa ODR
    // uma função definida no Arquivo 1, forçando sua inicialização dinâmica a ocorrer),
    // então 'b' será inicializado antes de seu uso em A::A
```

### Variáveis locais estáticas

Para a inicialização de variáveis estáticas e thread-local locais (ou seja, de escopo de bloco), veja [variáveis de bloco estáticas](<#/doc/language/storage_duration>).

Inicializador não é permitido em uma declaração de escopo de bloco de uma variável com [ligação externa ou interna](<#/doc/language/storage_duration>). Tal declaração deve aparecer com extern e não pode ser uma definição.

### Membros de classe

Membros de dados não estáticos podem ser inicializados com [lista de inicializadores de membro](<#/doc/language/initializer_list>) ou com um [inicializador de membro padrão](<#/doc/language/data_members>).

### Notas

A ordem de destruição de variáveis não-locais é descrita em [std::exit](<#/doc/utility/program/exit>).

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 270](<https://cplusplus.github.io/CWG/issues/270.html>) | C++98 | a ordem de inicialização de membros de dados estáticos de templates de classe era não especificada | especificada como não ordenada, exceto para especializações e definições explícitas
[CWG 441](<https://cplusplus.github.io/CWG/issues/441.html>) | C++98 | referências não-locais com duração de armazenamento estática nem sempre eram inicializadas antes das inicializações dinâmicas | consideradas como inicialização estática, sempre inicializadas antes das inicializações dinâmicas
[CWG 1415](<https://cplusplus.github.io/CWG/issues/1415.html>) | C++98 | uma declaração de variável extern de escopo de bloco poderia ser uma definição | proibido (nenhum inicializador permitido em tais declarações)
[CWG 2599](<https://cplusplus.github.io/CWG/issues/2599.html>) | C++98 | não estava claro se a avaliação de argumentos de função no inicializador faz parte da inicialização | faz parte da inicialização

### Veja também

*   [eliminação de cópia](<#/doc/language/copy_elision>)
*   [construtor de conversão](<#/doc/language/converting_constructor>)
*   [construtor de cópia](<#/doc/language/copy_constructor>)
*   [construtor padrão](<#/doc/language/default_constructor>)
*   [`explicit`](<#/doc/language/explicit>)
*   [construtor de movimento](<#/doc/language/move_constructor>)
*   [`new`](<#/doc/language/new>)

[documentação C](<#/>) para Inicialização
---