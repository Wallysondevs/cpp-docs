# Expressões Constantes

Define uma [expressão](<#/doc/language/expressions>) que pode ser avaliada em tempo de compilação.

Tais expressões podem ser usadas como argumentos de template não-tipo, tamanhos de array, e em outros contextos que exigem expressões constantes, por exemplo:
```cpp
    int n = 1;
    std::array<int, n> a1;  // Error: “n” is not a constant expression
    const int cn = 2;
    std::array<int, cn> a2; // OK: “cn” is a constant expression
```

### Definição
Uma expressão que pertence a qualquer uma das categorias de expressão constante listadas abaixo é uma _expressão constante_. | Categorias de expressão constante C++98

#### Expressão constante integral (C++98)

Nos seguintes locais, C++ exige expressões que avaliam para uma constante integral ou de enumeração:

  * [limites de array](<#/doc/language/array>) (incluindo as dimensões em [new expressions](<#/doc/language/new>) que não sejam a primeira)
  * constantes de [rótulo case](<#/doc/language/statements>)
  * comprimentos de [bit-field](<#/doc/language/bit_field>)
  * inicializadores de [enumerador](<#/doc/language/enum>)
  * inicializadores de [membro de dados estático](<#/doc/language/static>)
  * [argumentos de template não-tipo](<#/doc/language/template_parameters>) de tipo integral ou de enumeração

Uma expressão que satisfaz todas as condições a seguir é uma _expressão constante integral_ ﻿:

  * Ela envolve apenas as seguintes entidades:

    

  * literais de tipos aritméticos
  * enumeradores
  * variáveis ou membros de dados estáticos que satisfazem todas as condições a seguir:

    

  * São qualificados como `const`.
  * Não são qualificados como `volatile`.
  * São de tipos integrais ou de enumeração.
  * São inicializados com expressões constantes.

  * [parâmetros de template não-tipo](<#/doc/language/template_parameters>) de tipos integrais ou de enumeração
  * expressões [`sizeof`](<#/doc/language/sizeof>)

  * Ela não usa literais de ponto flutuante, a menos que sejam [explicitamente convertidos](<#/doc/language/explicit_cast>) para tipos integrais ou de enumeração.
  * Ela não aplica nenhuma conversão para tipos não-integrais e não-enumeração.
  * Ela não usa nenhuma das seguintes entidades, exceto nos operandos de `sizeof`:

    

  * função
  * objeto de classe
  * ponteiro
  * referência
  * operador de atribuição
  * operador de incremento
  * operador de decremento
  * operador de chamada de função
  * operador vírgula

#### Outras categorias de expressão constante

Outras expressões são consideradas expressões constantes apenas para o propósito de [inicialização constante](<#/doc/language/constant_initialization>). Tal expressão constante deve ser uma das seguintes expressões:

  * uma expressão que avalia para um [valor de ponteiro nulo](<#/doc/language/pointer>)
  * uma expressão que avalia para um valor de ponteiro para membro nulo
  * uma expressão constante aritmética
  * uma expressão constante de endereço
  * uma expressão constante de referência
  * uma expressão constante de endereço para um tipo de objeto completo, mais ou menos uma expressão constante integral
  * uma expressão constante de ponteiro para membro

Uma _expressão constante aritmética_ é uma expressão que satisfaz os requisitos para uma expressão constante integral, com as seguintes exceções:

  * Literais de ponto flutuante podem ser usados sem conversão explícita.
  * Conversões para tipos de ponto flutuante podem ser aplicadas.

Uma _expressão constante de endereço_ é uma expressão de tipo ponteiro que satisfaz todas as condições a seguir:

  * O ponteiro aponta para um lvalue que designa um objeto com [duração de armazenamento estática](<#/doc/language/storage_duration>), um [literal de string](<#/doc/language/string_literal>), ou uma [função](<#/doc/language/function>). O objeto não é um [subobjeto](<#/doc/language/objects>) de um tipo de [classe não-POD](<#/doc/language/classes>).
  * O ponteiro é criado por um dos seguintes métodos:

    

  * explicitamente usando o operador `address-of`
  * implicitamente usando um parâmetro de template não-tipo de tipo ponteiro
  * usando uma expressão de tipo array ou função

  * A expressão não chama nenhuma função.
  * A expressão usa conversões de ponteiro explícitas (exceto [`dynamic_cast`](<#/doc/language/dynamic_cast>)) e os seguintes operadores sem acessar o objeto resultante:

    

  * operador de subscrito
  * operador de indireção
  * operador `address-of`
  * operador de acesso a membro

  * Se o operador de subscrito for usado, um de seus operandos é uma expressão constante integral.

Uma _expressão constante de referência_ é uma expressão de tipo referência que satisfaz todas as condições a seguir:

  * A referência designa um objeto com duração de armazenamento estática, um parâmetro de template não-tipo de tipo referência, ou uma função. A referência não designa um membro ou classe base de um tipo de classe não-POD.
  * A expressão não chama nenhuma função.
  * A expressão usa conversões de referência explícitas (exceto [`dynamic_cast`](<#/doc/language/dynamic_cast>)) e os seguintes operadores sem acessar o objeto resultante:

    

  * operador de subscrito
  * operador de indireção
  * operador `address-of`
  * operador de acesso a membro

  * Se o operador de subscrito for usado, um de seus operandos é uma expressão constante integral.

Uma _expressão constante de ponteiro para membro_ é uma expressão de tipo ponteiro para membro onde o ponteiro é criado aplicando o operador `address-of` a um identificador qualificado, opcionalmente precedido por uma conversão explícita de ponteiro para membro.

(até C++11)
As seguintes expressões são coletivamente chamadas de _expressões constantes_ ﻿:

  * prvalue [core constant expressions](<#/doc/language/constant_expression>) de [literal type](<#/doc/language/constant_expression>) não-ponteiro
  * lvalue core constant expressions que designam objetos com [duração de armazenamento estática](<#/doc/language/storage_duration>) ou funções
  * prvalue core constant expressions de tipo ponteiro que avaliam para um dos seguintes valores:

    

  * o endereço de um objeto com duração de armazenamento estática
  * o endereço de uma função
  * um [valor de ponteiro nulo](<#/doc/language/pointer>)

  * prvalue core constant expressions do tipo [std::nullptr_t](<#/doc/types/nullptr_t>)

| (desde C++11)
(até C++14)
As seguintes entidades são _resultados permitidos de uma expressão constante_ ﻿:

  * objetos temporários com [duração de armazenamento estática](<#/doc/language/storage_duration>)
  * objetos não-temporários com duração de armazenamento estática cujos valores satisfazem as restrições listadas abaixo
  * funções não-[immediate](<#/doc/language/consteval>) (desde C++20)

Uma _expressão constante_ é ou uma glvalue [core constant expression](<#/doc/language/constant_expression>) que se refere a uma entidade que é um resultado permitido de uma expressão constante, ou uma prvalue core constant expression cujo valor satisfaz as seguintes restrições:

  * Se o valor é um objeto de tipo classe, cada membro de dados não-estático de tipo referência se refere a uma entidade que é um resultado permitido de uma expressão constante.
  * Se o valor é um objeto de [tipo escalar](<#/doc/language/type-id>), ele não tem um valor [indeterminado](<#/doc/language/default_initialization>).
  * Se o valor é de [tipo ponteiro](<#/doc/language/pointer>), ele é um dos seguintes valores:

    

  * o endereço de um objeto com duração de armazenamento estática
  * o endereço após o final de um objeto com duração de armazenamento estática
  * o endereço de uma função não-immediate (desde C++20)
  * um [valor de ponteiro nulo](<#/doc/language/pointer>)

|

  * Se o valor é de tipo ponteiro para função membro, ele não designa uma função immediate.

| (desde C++20)

  * Se o valor é um objeto de tipo classe ou array, cada subobjeto satisfaz essas restrições para o valor.

(desde C++14)
(até C++26)
Uma _expressão constante_ é ou uma glvalue [core constant expression](<#/doc/language/constant_expression>) que se refere a um objeto ou uma [função não-immediate](<#/doc/language/consteval>), ou uma prvalue core constant expression cujo valor satisfaz as seguintes restrições:

  * Cada [referência constituinte](<#/doc/language/constant_expression>) se refere a um objeto ou uma função não-immediate.
  * Nenhum [valor constituinte](<#/doc/language/constant_expression>) de [tipo escalar](<#/doc/language/type-id>) é um [valor indeterminado ou errôneo](<#/doc/language/default_initialization>).
  * Nenhum valor constituinte de tipo ponteiro é um ponteiro para uma função immediate ou um [valor de ponteiro inválido](<#/doc/language/pointer>).
  * Nenhum valor constituinte de tipo ponteiro para membro designa uma função immediate.

| (desde C++26)

Ao determinar se uma expressão é uma expressão constante, a [eliminação de cópia](<#/doc/language/copy_elision>) é assumida como não sendo realizada.

A definição C++98 de expressões constantes está inteiramente dentro da caixa de recolhimento. A descrição a seguir se aplica ao C++11 e versões posteriores do C++.

### Tipo literal

Os seguintes tipos são coletivamente chamados de _tipos literais_ ﻿:

  * `void` possivelmente cv-qualificado
  * [tipo escalar](<#/doc/language/type-id>)
  * [tipo referência](<#/doc/language/reference>)
  * um [array](<#/doc/language/array>) de tipo literal
  * tipo classe possivelmente cv-qualificado que satisfaz todas as condições a seguir:

    

  * Possui um [destrutor trivial](<#/doc/language/destructor>)(até C++20)[destrutor constexpr](<#/doc/language/constexpr>)(desde C++20).
  * Todos os seus membros de dados não-estáticos não-variantes e classes base são de tipos literais não-voláteis.
  * É um dos seguintes tipos:

    

    

  * um [tipo closure](<#/doc/language/lambda>)

| (desde C++17)

    

    

  * um tipo `union` [agregado](<#/doc/language/aggregate_initialization>) que satisfaz uma das seguintes condições:

    

  * Não possui [membro variante](<#/doc/language/union>).
  * Possui pelo menos um membro variante de tipo literal não-volátil.

  * um tipo agregado não-union, e cada um de seus membros de [union anônima](<#/doc/language/union>) satisfaz uma das seguintes condições:

    

  * Não possui membro variante.
  * Possui pelo menos um membro variante de tipo literal não-volátil.

  * um tipo com pelo menos um construtor `constexpr` (template) que não é um construtor de cópia ou de movimento

Apenas objetos de tipos literais podem ser criados dentro de uma expressão constante.

### Expressão constante central (Core constant expression)

Uma _core constant expression_ é qualquer expressão cuja avaliação **não** avaliaria nenhuma das seguintes construções da linguagem:

Construção da linguagem | Versão | Paper(s)
---|---|---
o ponteiro [`this`](<#/doc/language/this>), exceto em uma [função constexpr](<#/doc/language/constexpr>) que está sendo avaliada como parte da expressão, ou quando aparece em uma expressão de acesso a membro de classe implícita ou explícita | | [N2235](<https://wg21.link/N2235>)
um fluxo de controle que passa por uma declaração de uma [variável de bloco](<#/doc/language/scope>) com [duração de armazenamento](<#/doc/language/storage_duration>) estática ou de thread que não é [utilizável em expressões constantes](<#/doc/language/constant_expression>) | (desde C++23) | [P2242R3](<https://wg21.link/P2242R3>)
| Esta seção está incompleta
Razão: Transferir o conteúdo da lista ordenada em HTML bruto abaixo para a tabela wiki acima, adicionando os papers/problemas CWG que introduziram o item correspondente ao padrão. Os mini-exemplos não são preservados, eles podem ser combinados para formar um grande exemplo no final desta página.

  1. uma expressão de chamada de função que chama uma função (ou um construtor) que não é declarada [constexpr](<#/doc/language/constexpr>)
```cpp
 constexpr int n = std::numeric_limits<int>::max(); // OK: max() is constexpr
         constexpr int m = std::time(nullptr); // Error: std::time() is not constexpr
```

  2. uma chamada de função para uma função `constexpr` que é declarada, mas não definida
  3. uma chamada de função para uma instanciação de template de função/construtor `constexpr` onde a instanciação falha em satisfazer os requisitos de [função/construtor constexpr](<#/doc/language/constexpr>).
  4. uma chamada de função para uma função virtual `constexpr`, invocada em um objeto cujo tipo dinâmico é `constexpr-unknown`
  5. uma expressão que excederia os limites definidos pela implementação
  6. uma expressão cuja avaliação leva a qualquer forma de [comportamento indefinido](<#/doc/language/ub>) ou errôneo (desde C++26) da linguagem central, exceto por qualquer potencial comportamento indefinido introduzido por [atributos padrão](<#/doc/language/attributes>).
```cpp
constexpr double d1 = 2.0 / 1.0; // OK
         constexpr double d2 = 2.0 / 0.0; // Error: not defined
         constexpr int n = std::numeric_limits<int>::max() + 1; // Error: overflow
         int x, y, z[30];
         constexpr auto e1 = &y - &x;        // Error: undefined
         constexpr auto e2 = &z[20] - &z[3]; // OK
         constexpr std::bitset<2> a;
         constexpr bool b = a[2]; // UB, but unspecified if detected
```

  7. (até C++17) uma [expressão lambda](<#/doc/language/lambda>)
  8. uma [conversão implícita](<#/doc/language/implicit_cast>) de lvalue para rvalue, a menos que aplicada a...
     1. um glvalue do tipo (possivelmente cv-qualificado) [std::nullptr_t](<#/doc/types/nullptr_t>)
     2. um glvalue de tipo literal não-volátil que designa um objeto que é [utilizável em expressões constantes](<#/doc/language/constant_expression>)
```cpp
 int main()
            {
                const std::size_t tabsize = 50;
                int tab[tabsize]; // OK: tabsize is a constant expression
                                  // because tabsize is usable in constant expressions
                                  // because it has const-qualified integral type, and
                                  // its initializer is a constant initializer
            
                std::size_t n = 50;
                const std::size_t sz = n;
                int tab2[sz]; // Error: sz is not a constant expression
                              // because sz is not usable in constant expressions
                              // because its initializer was not a constant initializer
            }
```

     3. um glvalue de tipo literal não-volátil que se refere a um objeto não-volátil cuja vida útil começou dentro da avaliação desta expressão
  9. uma [conversão implícita](<#/doc/language/implicit_cast>) de lvalue para rvalue ou modificação aplicada a um membro não-ativo de uma [union](<#/doc/language/union>) ou seu subobjeto (mesmo que compartilhe uma sequência inicial comum com o membro ativo)
  10. uma conversão implícita de lvalue para rvalue em um objeto [cujo valor é indeterminado](<#/doc/language/default_initialization>)
  11. uma invocação de construtor/atribuição de cópia/movimento implícita para uma `union` cujo membro ativo é mutável (se houver), com vida útil começando fora da avaliação desta expressão
  12. (até C++20) uma expressão de atribuição que alteraria o membro ativo de uma `union`
  13. conversão de [ponteiro para void](<#/doc/language/pointer>) para um tipo ponteiro para objeto `T*` a menos que o ponteiro contenha um valor de ponteiro nulo ou aponte para um objeto cujo tipo é [similar](<#/doc/language/implicit_cast>) a `T` (desde C++26)
  14. [`dynamic_cast`](<#/doc/language/dynamic_cast>) cujo operando é um glvalue que se refere a um objeto cujo tipo dinâmico é `constexpr-unknown` (desde C++20)
  15. [`reinterpret_cast`](<#/doc/language/reinterpret_cast>)
  16. (até C++20) chamada de pseudo-destrutor
  17. (até C++14) um operador de incremento ou decremento
  18. (desde C++14) modificação de um objeto, a menos que o objeto tenha tipo literal não-volátil e sua vida útil tenha começado dentro da avaliação da expressão
```cpp
constexpr int incr(int& n)
         {
             return ++n;
         }
         
         constexpr int g(int k)
         {
             constexpr int x = incr(k); // Error: incr(k) is not a core constant
                                        // expression because lifetime of k
                                        // began outside the expression incr(k)
             return x;
         }
         
         constexpr int h(int k)
         {
             int x = incr(k); // OK: x is not required to be initialized
                              // with a core constant expression
             return x;
         }
         
         constexpr int y = h(1); // OK: initializes y with the value 2
                                 // h(1) is a core constant expression because
                                 // the lifetime of k begins inside the expression h(1)
```

  19. (desde C++20) uma chamada de destrutor ou chamada de pseudo-destrutor para um objeto cuja vida útil não começou dentro da avaliação desta expressão
  20. uma expressão [`typeid`](<#/doc/language/typeid>) aplicada a um glvalue de tipo polimórfico e esse glvalue se refere a um objeto cujo tipo dinâmico é `constexpr-unknown` (desde C++20)
  21. uma [new expression](<#/doc/language/new>), a menos que uma das seguintes condições seja satisfeita: (desde C++20)
     * A [função de alocação](<#/doc/memory/new/operator_new>) selecionada é uma função de alocação global substituível e o armazenamento alocado é desalocado dentro da avaliação desta expressão.
| (desde C++20)
     * A função de alocação selecionada é uma forma não-alocadora com um tipo alocado `T`, e o argumento de posicionamento satisfaz todas as condições a seguir:

    
     * Ele aponta para:

    
     * um objeto cujo tipo é similar a `T`, se `T` não for um tipo array, ou
     * o primeiro elemento de um objeto de um tipo similar a `T`, se `T` for um tipo array.
     * Ele aponta para armazenamento cuja duração começou dentro da avaliação desta expressão.
```cpp
  // (desde C++26)
  22. uma delete expression, a menos que ela desaloque uma região de armazenamento alocada dentro da avaliação desta expressão (desde C++20)
  23. (desde C++20) Coroutines: uma await-expression ou uma yield-expression
  24. (desde C++20) uma comparação de três vias quando o resultado é não especificado
  25. um operador de igualdade ou relacional cujo resultado é não especificado
  26. (até C++14) um operador de atribuição ou atribuição composta
  27. (até C++26) uma `throw expression`
  28. (desde C++26) uma construção de um objeto de exceção, a menos que o objeto de exceção e todas as suas cópias implícitas criadas por invocações de std::current_exception ou std::rethrow_exception sejam destruídos dentro da avaliação desta expressão
```
```cpp
constexpr void check(int i)
         {
             if (i < 0)
                 throw i;
         }
         
         constexpr bool is_ok(int i)
         {
             try {
                 check(i);
             } catch (...) {
                 return false;
             }
             return true;
         }
         
         constexpr bool always_throw()
         {
             throw 12;
             return true;
         }
         
         static_assert(is_ok(5)); // OK
         static_assert(!is_ok(-1)); // OK since C++26
         static_assert(always_throw()); // Error: uncaught exception
```

  29. uma [asm-declaration](<#/doc/language/asm>)
  30. uma invocação da macro [va_arg](<#/doc/utility/variadic/va_arg>)
  31. uma instrução [`goto`](<#/doc/language/goto>)
  32. uma expressão [`dynamic_cast`](<#/doc/language/dynamic_cast>) ou [`typeid`](<#/doc/language/typeid>) ou [new expression](<#/doc/language/new>) (desde C++26) que lançaria uma exceção onde nenhuma definição do tipo de exceção é alcançável (desde C++26)
  33. dentro de uma expressão lambda, uma referência a `this` ou a uma variável definida fora dessa lambda, se essa referência fosse um `odr-use`
```cpp
void g()
         {
             const int n = 0;
         
             constexpr int j = *&n; // OK: outside of a lambda-expression
         
             [=]
             {
                 constexpr int i = n;   // OK: 'n' is not odr-used and not captured here.
                 constexpr int j = *&n; // Ill-formed: '&n' would be an odr-use of 'n'.
             };
         }
```

note que se o `ODR-use` ocorrer em uma chamada de função para um closure, ele não se refere a `this` ou a uma variável envolvente, pois acessa um membro de dados do closure
```cpp
 // OK: 'v' & 'm' are odr-used but do not occur in a constant-expression
         // within the nested lambda
         auto monad = { return [=]{ return v; }; };
         auto bind = { return ={ return fvm(m()); }; };
         
         // OK to have captures to automatic objects created during constant expression evaluation.
         static_assert(bind(monad(2))(monad)() == monad(2)());
```

| (desde C++17)

#### Requisitos extras

Mesmo que uma expressão E não avalie nada do que foi declarado acima, é definido pela implementação se E é uma core constant expression se a avaliação de E resultaria em [comportamento indefinido em tempo de execução](<#/doc/language/ub>).

Mesmo que uma expressão E não avalie nada do que foi declarado acima, é não especificado se E é uma core constant expression se a avaliação de E avaliaria qualquer um dos seguintes:

  * Uma operação com comportamento indefinido na [standard library](<#/doc/standard_library>).
  * Uma invocação da macro [va_start](<#/doc/utility/variadic/va_start>).

Para fins de determinar se uma expressão é uma core constant expression, a avaliação do corpo de uma função membro de [std::allocator](<#/doc/memory/allocator>)&lt;T&gt; é ignorada se `T` for um tipo literal.

Para fins de determinar se uma expressão é uma core constant expression, a avaliação de uma chamada para um construtor de cópia/movimento trivial ou operador de atribuição de cópia/movimento de uma [union](<#/doc/language/union>) é considerada como copiando/movendo o membro ativo da `union`, se houver.

Para fins de determinar se uma expressão é uma core constant expression, a avaliação de uma expressão identificadora que nomeia um [structured binding](<#/doc/language/structured_binding>) `bd` tem as seguintes semânticas:

  * Se `bd` é um lvalue que se refere ao objeto ligado a uma referência inventada `ref`, o comportamento é como se `ref` fosse nomeada.
  * Caso contrário, se `bd` nomeia um elemento de array, o comportamento é o de avaliar `e[i]`, onde `e` é o nome da variável inicializada a partir do inicializador da declaração de structured binding, e `i` é o índice do elemento referido por `bd`.
  * Caso contrário, se `bd` nomeia um membro de classe, o comportamento é o de avaliar `e.m`, onde `e` é o nome da variável inicializada a partir do inicializador da declaração de structured binding, e `m` é o nome do membro referido por `bd`.

| (desde C++26)

Durante a avaliação da expressão como uma core constant expression, todas as expressões identificadoras e usos de `*this` que se referem a um objeto ou referência cuja vida útil começou fora da avaliação da expressão são tratados como se referindo a uma instância específica desse objeto ou referência cuja vida útil e a de todos os subobjetos (incluindo todos os membros da `union`) inclui toda a avaliação constante.

  * Para tal objeto que não é [utilizável em expressões constantes](<#/doc/language/constant_expression>) (desde C++20), o tipo dinâmico do objeto é _constexpr-unknown_.
  * Para tal referência que não é utilizável em expressões constantes (desde C++20), a referência é tratada como ligando-se a um objeto não especificado do tipo referenciado cuja vida útil e a de todos os subobjetos inclui toda a avaliação constante e cujo tipo dinâmico é `constexpr-unknown`.

### Expressão constante integral

Uma _expressão constante integral_ é uma expressão de tipo integral ou de enumeração não-escopada implicitamente convertida para um prvalue, onde a expressão convertida é uma core constant expression.

Se uma expressão de tipo classe é usada onde uma expressão constante integral é esperada, a expressão é [implicitamente convertida contextualmente](<#/doc/language/implicit_cast>) para um tipo integral ou de enumeração não-escopada.

### Expressão constante convertida

Uma _expressão constante convertida_ do tipo `T` é uma expressão [implicitamente convertida](<#/doc/language/implicit_cast>) para o tipo `T`, onde a expressão convertida é uma expressão constante, e a sequência de conversão implícita contém apenas:

    

  * [conversões definidas pelo usuário](<#/doc/language/cast_operator>) `constexpr`
  * [conversões de lvalue para rvalue](<#/doc/language/implicit_cast>)
  * [promoções integrais](<#/doc/language/implicit_cast>)
  * [conversões integrais](<#/doc/language/implicit_cast>) não-restritivas
  * [promoções de ponto flutuante](<#/doc/language/implicit_cast>)
  * [conversões de ponto flutuante](<#/doc/language/implicit_cast>) não-restritivas

    

  * [conversões de array para ponteiro](<#/doc/language/implicit_cast>)
  * [conversões de função para ponteiro](<#/doc/language/implicit_cast>)
  * [conversões de ponteiro de função](<#/doc/language/implicit_cast>)
  * [conversões de qualificação](<#/doc/language/implicit_cast>)
  * [conversões de ponteiro nulo](<#/doc/language/implicit_cast>) de [std::nullptr_t](<#/doc/types/nullptr_t>)
  * [conversões de ponteiro para membro nulo](<#/doc/language/implicit_cast>) de [std::nullptr_t](<#/doc/types/nullptr_t>)

| (desde C++17)

E se ocorrer qualquer [ligação de referência](<#/doc/language/reference_initialization>), ela só pode ser [ligação direta](<#/doc/language/reference_initialization>).

Os seguintes contextos exigem uma expressão constante convertida:

  * a expressão constante de [rótulos case](<#/doc/language/switch>)
  * [inicializadores de enumerador](<#/doc/language/enum>) quando o tipo subjacente é fixo
  * argumentos de [template](<#/doc/language/template_parameters>) não-tipo integrais e de enumeração (até C++17)

  * [limites de array](<#/doc/language/array>)
  * as dimensões em [new expressions](<#/doc/language/new>) que não sejam a primeira

| (desde C++14)

  * o índice da [expressão de indexação de pack](<#/doc/language/pack_indexing>) e do [especificador de indexação de pack](<#/doc/language/pack_indexing>)

| (desde C++26)

Uma _expressão constante convertida contextualmente do tipo bool_ é uma expressão, [convertida contextualmente para bool](<#/doc/language/implicit_cast>), onde a expressão convertida é uma expressão constante e a sequência de conversão contém apenas as conversões acima.

Os seguintes contextos exigem uma expressão constante convertida contextualmente do tipo bool:

  * [especificações noexcept](<#/doc/language/noexcept_spec>)

  * [declarações static_assert](<#/doc/language/static_assert>)

| (até C++23)

  * [instruções if constexpr](<#/doc/language/if>)

| (desde C++17)
(até C++23)

  * [especificadores explicit condicionais](<#/doc/language/explicit>)

| (desde C++20)

### Entidades constituintes

Os _valores constituintes_ de um objeto `obj` são definidos da seguinte forma:

  * Se `obj` tem tipo escalar, o valor constituinte é o valor de `obj`.
  * Caso contrário, os valores constituintes são os valores constituintes de quaisquer [subobjetos](<#/doc/language/objects>) diretos de `obj` que não sejam [membros de union inativos](<#/doc/language/union>).

As _referências constituintes_ de um objeto `obj` incluem as seguintes referências:

  * quaisquer membros diretos de `obj` que tenham tipo referência
  * as referências constituintes de quaisquer subobjetos diretos de `obj` que não sejam membros de union inativos

Os _valores constituintes_ e _referências constituintes_ de uma variável `var` são definidos da seguinte forma:

  * Se `var` declara um objeto, os valores e referências constituintes são os valores e referências constituintes desse objeto.
  * Se `var` declara uma referência, a referência constituinte é essa referência.

Para qualquer referência constituinte `ref` de uma variável `var`, se `ref` estiver ligada a um objeto temporário ou subobjeto dele cuja vida útil é estendida para a de `ref`, os valores e referências constituintes desse objeto temporário também são valores e referências constituintes de `var`, recursivamente.

### Entidades representáveis por constexpr

Objetos com duração de armazenamento estática são _constexpr-referenciáveis_ em qualquer ponto do programa. Um objeto `obj` com duração de armazenamento automática é _constexpr-referenciável_ a partir de um ponto `P` se o [escopo](<#/doc/language/scope>) mais interno que envolve a variável `var` e o escopo mais interno que envolve `P` são o mesmo escopo de parâmetro de função que não se associa à lista de parâmetros de uma [requires expression](<#/doc/language/requires>), onde `var` é a variável correspondente ao objeto completo de `obj` ou a variável para cuja vida útil a de `obj` é [estendida](<#/doc/language/reference_initialization>). Um objeto ou referência `x` é _constexpr-representável_ em um ponto `P` se todas as seguintes condições são satisfeitas:

  * Para cada valor constituinte de `x` que aponta para um objeto `obj`, `obj` é constexpr-referenciável a partir de `P`.
* Para cada valor constituinte de x que aponta para além de um objeto obj, obj é referenciável-constexpr a partir de `P`.
* Para cada referência constituinte de x que se refere a um objeto obj, obj é referenciável-constexpr a partir de `P`.

| (desde C++26)

### Entidades inicializadas-constantemente

| Uma variável ou objeto temporário obj é _inicializado-constantemente_ se todas as seguintes condições forem satisfeitas:

* Ou possui um inicializador, ou seu tipo é [const-default-constructible](<#/doc/language/default_initialization>).
* A [full-expression](<#/doc/language/expressions>) de sua inicialização é uma expressão constante no contexto de exigir uma expressão constante, exceto que, se obj for um objeto, essa full-expression também pode invocar [construtores constexpr](<#/doc/language/constexpr>) para obj e seus subobjetos, mesmo que esses objetos sejam de tipos de classe não-literais.

| (até C++26)
Uma variável var é _inicializável-constantemente_ se todas as seguintes condições forem satisfeitas:

* A [full-expression](<#/doc/language/expressions>) de sua inicialização é uma expressão constante no contexto de exigir uma expressão constante.
* Imediatamente após a declaração de inicialização de var, o objeto ou referência declarado por var é representável-constexpr.
* Se o objeto ou referência x declarado por var tiver duração de armazenamento estática ou de thread, x é representável-constexpr no ponto mais próximo cujo escopo imediato é um escopo de namespace que segue a declaração de inicialização de var.

Uma variável inicializável-constantemente é _inicializada-constantemente_ se ela tiver um inicializador, ou se seu tipo for [const-default-constructible](<#/doc/language/default_initialization>). | (desde C++26)

### Utilizável em expressões constantes

Uma variável é _potencialmente-constante_ se for uma [variável constexpr](<#/doc/language/constexpr>) ou se tiver tipo de referência ou tipo integral ou de enumeração qualificado como const não-volátil.

Uma variável potencialmente-constante inicializada-constantemente var é _utilizável em expressões constantes_ em um ponto `P` se a declaração de inicialização de var `D` for alcançável a partir de `P` e qualquer uma das seguintes condições for satisfeita:

* var é uma variável constexpr.
* var não é inicializada com um valor [TU-local](<#/doc/language/tu_local>).
* `P` está na mesma unidade de tradução que `D`.

Um objeto ou referência é _utilizável em expressões constantes_ em um ponto `P` se for uma das seguintes entidades:

* uma variável que é utilizável em expressões constantes em `P`
* um objeto temporário de tipo literal qualificado como const não-volátil cuja vida útil é estendida à de uma variável que é utilizável em expressões constantes em `P`
* um [objeto de parâmetro de template](<#/doc/language/template_parameters>)
* um objeto [literal de string](<#/doc/language/string_literal>)
* um subobjeto não-mutável de qualquer um dos itens acima
* um membro de referência de qualquer um dos itens acima

| (até C++26)
Um objeto ou referência é _potencialmente utilizável em expressões constantes_ em um ponto `P` se for uma das seguintes entidades:

* uma variável que é utilizável em expressões constantes em `P`
* um objeto temporário de tipo literal qualificado como const não-volátil cuja vida útil é estendida à de uma variável que é utilizável em expressões constantes em `P`
* um [objeto de parâmetro de template](<#/doc/language/template_parameters>)
* um objeto [literal de string](<#/doc/language/string_literal>)
* um subobjeto não-mutável de qualquer um dos itens acima
* um membro de referência de qualquer um dos itens acima

```cpp
Um objeto ou referência é _utilizável em expressões constantes_ no ponto `P` se for um objeto ou referência que é potencialmente utilizável em expressões constantes em `P` e é representável-constexpr em `P`.  // (desde C++26)
```

### Expressões manifestamente avaliadas-constantemente

As seguintes expressões (incluindo conversões para o tipo de destino) são _manifestamente avaliadas-constantemente_ ﻿:

* [limites de array](<#/doc/language/array>)
* as dimensões em [expressões new](<#/doc/language/new>) que não a primeira
* comprimentos de [bit-field](<#/doc/language/bit_field>)
* inicializadores de [enumeração](<#/doc/language/enum>)
* [alinhamentos](<#/doc/language/alignas>)
* a expressão constante de [rótulos case](<#/doc/language/switch>)
* [argumentos de template](<#/doc/language/template_parameters>) não-tipo
* expressões em [especificações noexcept](<#/doc/language/noexcept_spec>)
* expressões em [declarações static_assert](<#/doc/language/static_assert>)
* inicializadores de [variáveis constexpr](<#/doc/language/constexpr>)
* condições de [instruções if constexpr](<#/doc/language/if>)
* expressões em [especificadores explicit condicionais](<#/doc/language/explicit>)
* [invocações imediatas](<#/doc/language/consteval>)
* expressões de restrição em definições de [concept](<#/doc/language/constraints>), [requisitos aninhados](<#/doc/language/constraints>) e [cláusulas requires](<#/doc/language/constraints>), ao determinar se as restrições são satisfeitas
* inicializadores de variáveis com tipo de referência ou tipo integral ou de enumeração qualificado como const, mas apenas se os inicializadores forem expressões constantes
* inicializadores de variáveis estáticas e thread-local, mas apenas se todas as subexpressões dos inicializadores (incluindo chamadas de construtores e conversões implícitas) forem expressões constantes (ou seja, se os inicializadores forem [inicializadores constantes](<#/doc/language/constant_initialization>))

Se uma avaliação ocorre em um contexto manifestamente avaliado-constantemente pode ser detectado por [std::is_constant_evaluated](<#/doc/types/is_constant_evaluated>) e [`if consteval`](<#/doc/language/if>)(desde C++23).

(desde C++20)

### Funções e variáveis necessárias para avaliação constante

As seguintes expressões ou conversões são _potencialmente avaliadas-constantemente_ :

* expressões manifestamente avaliadas-constantemente
* expressões potencialmente-avaliadas
* subexpressões imediatas de uma [lista de inicializadores entre chaves](<#/doc/language/initialization>) (a avaliação constante pode ser necessária para determinar se [uma conversão é de estreitamento](<#/doc/language/list_initialization>))
* expressões address-of que ocorrem dentro de uma [entidade template](<#/doc/language/templates>) (a avaliação constante pode ser necessária para determinar se tal expressão é [dependente de valor](<#/doc/language/dependent_name>))
* subexpressões de um dos itens acima que não são uma subexpressão de um [operando não avaliado](<#/doc/language/expressions>) aninhado

Uma função é _necessária para avaliação constante_ se for uma função constexpr e [nomeada por](<#/doc/language/definition>) uma expressão que é potencialmente avaliada-constantemente.

Uma variável é _necessária para avaliação constante_ se for uma variável constexpr ou for de tipo integral qualificado como const não-volátil ou de tipo de referência e a [expressão identificadora](<#/doc/language/expressions>) que a denota for potencialmente avaliada-constantemente.

A definição de uma função defaulted e a instanciação de uma especialização de [function template](<#/doc/language/function_template>) ou especialização de [variable template](<#/doc/language/variable_template>)(desde C++14) são acionadas se a função ou variável(desde C++14) for necessária para avaliação constante.

### Subexpressão constante

Uma _subexpressão constante_ é uma expressão cuja avaliação como [subexpressão](<#/doc/language/expressions>) de uma expressão e não impediria que e fosse uma [expressão constante central](<#/doc/language/constant_expression>), onde e não é nenhuma das seguintes expressões:

* [expressão throw](<#/doc/language/throw>)

* [expressão yield](<#/doc/language/coroutines>)

| (desde C++20)

* [expressão de atribuição](<#/doc/language/operator_assignment>)
* [expressão vírgula](<#/doc/language/operator_other>)

### Notas

```cpp
Macro de teste de recurso | Valor | Std | Recurso
`__cpp_constexpr_in_decltype` | `201711L`  // (C++20)
(DR11) | Geração de definições de função e variável quando necessárias para avaliação constante
`__cpp_constexpr_dynamic_alloc` | `201907L` | (C++20) | Operações para duração de armazenamento dinâmica em funções constexpr
`__cpp_constexpr` | `202306L` | (C++26) | cast constexpr de void*: em direção à type-erasure constexpr
`202406L` | (C++26) | placement new e new[] constexpr
`__cpp_constexpr_exceptions` | `202411L` | (C++26) | exceções constexpr
```

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 94](<https://cplusplus.github.io/CWG/issues/94.html>) | C++98 | expressões aritméticas constantes não podiam envolver variáveis e membros de dados estáticos | elas podem
[CWG 366](<https://cplusplus.github.io/CWG/issues/366.html>) | C++98 | expressões envolvendo literais de string podiam ser expressões constantes integrais | elas não são
[CWG 457](<https://cplusplus.github.io/CWG/issues/457.html>) | C++98 | expressões envolvendo variáveis voláteis podiam ser expressões constantes integrais | elas não são
[CWG 1293](<https://cplusplus.github.io/CWG/issues/1293.html>) | C++11 | não estava claro se literais de string são utilizáveis em expressões constantes | elas são utilizáveis
[CWG 1311](<https://cplusplus.github.io/CWG/issues/1311.html>) | C++11 | glvalues voláteis podiam ser usados em expressões constantes | proibido
[CWG 1312](<https://cplusplus.github.io/CWG/issues/1312.html>) | C++11 | reinterpret_cast é proibido em expressões constantes, mas o cast para e de void* podia alcançar o mesmo efeito | conversões proibidas do tipo _cv_ void* para um tipo ponteiro-para-objeto
[CWG 1313](<https://cplusplus.github.io/CWG/issues/1313.html>) | C++11 | comportamento indefinido era permitido; toda subtração de ponteiro era proibida | UB proibido; subtração de ponteiro no mesmo array OK
[CWG 1405](<https://cplusplus.github.io/CWG/issues/1405.html>) | C++11 | para objetos que são utilizáveis em expressões constantes, seus subobjetos mutáveis também eram utilizáveis | eles não são utilizáveis
[CWG 1454](<https://cplusplus.github.io/CWG/issues/1454.html>) | C++11 | passar constantes através de funções constexpr via referências não era permitido | permitido
[CWG 1455](<https://cplusplus.github.io/CWG/issues/1455.html>) | C++11 | expressões constantes convertidas podiam ser apenas prvalues | podem ser lvalues
[CWG 1456](<https://cplusplus.github.io/CWG/issues/1456.html>) | C++11 | uma expressão constante de endereço não podia designar o endereço um após o final de um array | permitido
[CWG 1535](<https://cplusplus.github.io/CWG/issues/1535.html>) | C++11 | uma expressão typeid cujo operando é de um tipo de classe polimórfica não era uma expressão constante central, mesmo que nenhuma verificação em tempo de execução estivesse envolvida | a restrição do operando é limitada a glvalues de tipos de classe polimórfica
[CWG 1581](<https://cplusplus.github.io/CWG/issues/1581.html>) | C++11 | funções necessárias para avaliação constante não eram exigidas para serem definidas ou instanciadas | exigido
[CWG 1613](<https://cplusplus.github.io/CWG/issues/1613.html>) | C++11 | expressões constantes centrais podiam avaliar qualquer referência ODR-usada dentro de expressões lambda | algumas referências não podiam ser avaliadas
[CWG 1694](<https://cplusplus.github.io/CWG/issues/1694.html>) | C++11 | vincular o valor de um temporário a uma referência de duração de armazenamento estática era uma expressão constante | não é uma expressão constante
[CWG 1872](<https://cplusplus.github.io/CWG/issues/1872.html>) | C++11 | expressões constantes centrais podiam invocar instanciações de function template constexpr que não satisfazem os requisitos de função constexpr | tais instanciações não podem ser invocadas
[CWG 1952](<https://cplusplus.github.io/CWG/issues/1952.html>) | C++11 | comportamentos indefinidos da standard library eram exigidos para serem diagnosticados | não especificado se são diagnosticados
[CWG 2022](<https://cplusplus.github.io/CWG/issues/2022.html>) | C++98 | a determinação da expressão constante podia depender se a elisão de cópia é realizada | assuma que a elisão de cópia é sempre realizada
[CWG 2126](<https://cplusplus.github.io/CWG/issues/2126.html>) | C++11 | temporários de tipos literais qualificados como const, com vida útil estendida e inicializados-constantemente, não eram utilizáveis em expressões constantes | utilizável
[CWG 2129](<https://cplusplus.github.io/CWG/issues/2129.html>) | C++11 | literais inteiros não eram expressões constantes | eles são
[CWG 2167](<https://cplusplus.github.io/CWG/issues/2167.html>) | C++11 | referências não-membro locais a uma avaliação tornavam a avaliação não-constexpr | referências não-membro permitidas
[CWG 2278](<https://cplusplus.github.io/CWG/issues/2278.html>) | C++98 | a resolução do [problema CWG 2022](<https://cplusplus.github.io/CWG/issues/2022.html>) não era implementável | assuma que a elisão de cópia nunca é realizada
[CWG 2299](<https://cplusplus.github.io/CWG/issues/2299.html>) | C++14 | não estava claro se macros em [`<cstdarg>`](<#/doc/header/cstdarg>) podem ser usadas em avaliação constante | `va_arg` proibido, `va_start` não especificado
[CWG 2400](<https://cplusplus.github.io/CWG/issues/2400.html>) | C++11 | invocar uma função virtual constexpr em um objeto não utilizável em expressões constantes e cuja vida útil começou fora da expressão contendo a invocação podia ser uma expressão constante | não é uma expressão constante
[CWG 2490](<https://cplusplus.github.io/CWG/issues/2490.html>) | C++20 | chamadas de destrutores (pseudo) careciam de restrições na avaliação constante | restrição adicionada
[CWG 2552](<https://cplusplus.github.io/CWG/issues/2552.html>) | C++23 | ao avaliar uma expressão constante central, o fluxo de controle não podia passar por uma declaração de uma variável não-bloco | pode
[CWG 2558](<https://cplusplus.github.io/CWG/issues/2558.html>) | C++11 | um valor indeterminado podia ser uma expressão constante | não é uma expressão constante
[CWG 2647](<https://cplusplus.github.io/CWG/issues/2647.html>) | C++20 | variáveis de tipos qualificados como volatile podiam ser potencialmente-constantes | elas não são
[CWG 2763](<https://cplusplus.github.io/CWG/issues/2763.html>) | C++11 | a violação de `[[[noreturn](<#/doc/language/attributes/noreturn>)]]` não era exigida para ser detectada durante a avaliação constante | exigido
[CWG 2851](<https://cplusplus.github.io/CWG/issues/2851.html>) | C++11 | expressões constantes convertidas não permitiam conversões de ponto flutuante | permitem conversões de ponto flutuante não-estreitamento
[CWG 2907](<https://cplusplus.github.io/CWG/issues/2907.html>) | C++11 | expressões constantes centrais não podiam aplicar conversões lvalue-para-rvalue a glvalues de [std::nullptr_t](<#/doc/types/nullptr_t>) | podem aplicar tais conversões
[CWG 2909](<https://cplusplus.github.io/CWG/issues/2909.html>) | C++20 | uma variável sem um inicializador só podia ser inicializada-constantemente se sua inicialização padrão resultasse em alguma inicialização sendo realizada | só pode ser inicializada-constantemente se seu tipo for const-default-initializable
[CWG 2924](<https://cplusplus.github.io/CWG/issues/2924.html>) | C++11 C++23 | não era especificado se uma expressão que viola as restrições de `[[[noreturn](<#/doc/language/attributes/noreturn>)]]` (C++11) ou `[[[assume](<#/doc/language/attributes/assume>)]]` (C++23) é uma expressão constante central | é definido pela implementação
[P2280R4](<https://wg21.link/P2280R4>) | C++11 | avaliar uma expressão contendo uma expressão identificadora ou *this que se refere a um objeto ou referência cuja vida útil começou fora desta avaliação não é uma expressão constante | pode ser uma expressão constante

### Veja também

[especificador `constexpr`](<#/doc/language/constexpr>)(C++11) | especifica que o valor de uma variável ou função pode ser computado em tempo de compilação
---|---
[ `is_literal_type`](<#/doc/types/is_literal_type>)(C++11)(obsoleto em C++17)(removido em C++20) | verifica se um tipo é um tipo literal
(template de classe)
[documentação C](<#/>) para Expressões constantes