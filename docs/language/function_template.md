# Modelo de função

Um modelo de função (function template) define uma família de funções.

### Sintaxe

---
`template` `<` parameter-list `>` function-declaration | (1) |
---|---|---
`template` `<` parameter-list `>` `requires` constraint function-declaration | (2) | (desde C++20)
function-declaration-with-placeholders | (3) | (desde C++20)
`export` `template` `<` parameter-list `>` function-declaration | (4) | (removido em C++11)

### Explicação

- **parameter-list** — uma lista não vazia separada por vírgulas dos [parâmetros de modelo](<#/doc/language/template_parameters>), cada um dos quais é um [parâmetro não-tipo](<#/doc/language/template_parameters>), um [parâmetro de tipo](<#/doc/language/template_parameters>), um [parâmetro de modelo](<#/doc/language/template_parameters>), ou um [parameter pack](<#/doc/language/parameter_pack>) de qualquer um desses (desde C++11). Assim como em qualquer modelo, os parâmetros podem ser [restritos](<#/doc/language/template_parameters>) (desde C++20).
- **function-declaration** — uma [declaração de função](<#/doc/language/function>). O nome da função declarada torna-se um nome de modelo.
- **constraint** — uma [expressão de restrição](<#/doc/language/constraints>) que restringe os parâmetros de modelo aceitos por este modelo de função.
function-declaration-
- **with-placeholders** — uma [declaração de função](<#/doc/language/function>) onde o tipo de pelo menos um parâmetro usa o placeholder [auto](<#/doc/language/auto>) ou [Concept auto](<#/doc/language/constraints>): a lista de parâmetros de modelo terá um parâmetro inventado para cada placeholder (veja Modelos de função abreviados abaixo).
`export` era um modificador opcional que declarava o modelo como _exportado_ (quando usado com um modelo de classe, ele declarava todos os seus membros também exportados). Arquivos que instanciaram modelos exportados não precisavam incluir suas definições: a declaração era suficiente. As implementações de `export` eram raras e divergiam entre si nos detalhes. | (ate C++11)

### Modelo de função abreviado

Quando tipos placeholder (seja [auto](<#/doc/language/auto>) ou [Concept auto](<#/doc/language/constraints>)) aparecem na lista de parâmetros de uma declaração de função ou de uma declaração de modelo de função, a declaração declara um modelo de função, e um parâmetro de modelo inventado para cada placeholder é anexado à lista de parâmetros de modelo:
```cpp
    void f1(auto); // same as template<class T> void f1(T)
    void f2(C1 auto); // same as template<C1 T> void f2(T), if C1 is a concept
    void f3(C2 auto...); // same as template<C2... Ts> void f3(Ts...), if C2 is a concept
    void f4(const C3 auto*, C4 auto&); // same as template<C3 T, C4 U> void f4(const T*, U&);
    
    template<class T, C U>
    void g(T x, U y, C auto z); // same as template<class T, C U, C W> void g(T x, U y, W z);
```

Modelos de função abreviados podem ser especializados como todos os modelos de função.
```cpp
    template<>
    void f4<int>(const int*, const double&); // specialization of f4<int, const double>
```

| (desde C++20)

### Assinatura de modelo de função

Todo modelo de função possui uma assinatura.

A assinatura de um template-head é a [lista de parâmetros de modelo](<#/doc/language/template_parameters>), excluindo nomes de parâmetros de modelo e [argumentos padrão](<#/doc/language/template_parameters>), e a cláusula requires (se houver) (desde C++20).

A assinatura de um modelo de função contém o nome, a lista de tipos de parâmetros, o tipo de retorno, a cláusula requires final (se houver) (desde C++20), e a assinatura do template-head. Exceto para os seguintes casos, sua assinatura também contém o namespace envolvente.

Se o modelo de função for um membro de classe, sua assinatura contém a classe da qual a função é membro em vez do namespace envolvente. Sua assinatura também contém a cláusula requires final (se houver) (desde C++20), o ref-qualifier (se houver), e (desde C++11) os qualificadores _cv_ (se houver).

Se o modelo de função for um [friend](<#/doc/language/friend>) com restrição envolvendo parâmetros de modelo envolventes, sua assinatura contém a classe envolvente em vez do namespace envolvente. | (desde C++20)

### Instanciação de modelo de função

Um modelo de função por si só não é um tipo, nem uma função. Nenhum código é gerado a partir de um arquivo fonte que contém apenas definições de modelo. Para que qualquer código apareça, um modelo deve ser instanciado: os argumentos de modelo devem ser determinados para que o compilador possa gerar uma função real (ou classe, a partir de um modelo de classe).

#### Instanciação explícita

---
`template` return-type name `<` argument-list `>` `(` parameter-list `)` `;` | (1) |
---|---|---
`template` return-type name `(` parameter-list `)` `;` | (2) |
`extern` `template` return-type name `<` argument-list `>` `(` parameter-list `)` `;` | (3) | (desde C++11)
`extern` `template` return-type name `(` parameter-list `)` `;` | (4) | (desde C++11)

1) Definição de instanciação explícita (sem [dedução de argumento de modelo](<#/doc/language/template_argument_deduction>) se cada parâmetro de modelo não-padrão for explicitamente especificado)

2) Definição de instanciação explícita com dedução de argumento de modelo para todos os parâmetros

3) Declaração de instanciação explícita (sem dedução de argumento de modelo se cada parâmetro de modelo não-padrão for explicitamente especificado)

4) Declaração de instanciação explícita com dedução de argumento de modelo para todos os parâmetros

Uma definição de instanciação explícita força a instanciação da função ou função membro a que se referem. Ela pode aparecer no programa em qualquer lugar após a definição do modelo e, para uma dada lista de argumentos, só é permitido aparecer uma vez no programa, sem necessidade de diagnóstico.

Uma declaração de instanciação explícita (um template extern) impede instanciações implícitas: o código que de outra forma causaria uma instanciação implícita deve usar a definição de instanciação explícita fornecida em outro lugar no programa. | (desde C++11)

Um argumento de modelo final pode ser deixado não especificado em uma instanciação explícita de uma especialização de modelo de função ou de uma especialização de modelo de função membro se puder ser [deduzido](<#/doc/language/template_argument_deduction>) do parâmetro da função:
```cpp
    template<typename T>
    void f(T s)
    {
        std::cout << s << '\n';
    }
    
    template void f<double>(double); // instantiates f<double>(double)
    template void f<>(char);         // instantiates f<char>(char), template argument deduced
    template void f(int);            // instantiates f<int>(int), template argument deduced
```

A instanciação explícita de um modelo de função ou de uma função membro de um modelo de classe não pode usar `inline` ou `constexpr`. Se a declaração da instanciação explícita nomear uma função membro especial implicitamente declarada, o programa é malformado.

A instanciação explícita de um [construtor](<#/doc/language/initializer_list>) não pode usar uma lista de parâmetros de modelo (sintaxe (1)), o que também nunca é necessário porque eles podem ser deduzidos (sintaxe (2)).

A instanciação explícita de um [destrutor prospectivo](<#/doc/language/destructor>) deve nomear o destrutor selecionado da classe. | (desde C++20)

Declarações de instanciação explícita não suprimem a instanciação implícita de funções [inline](<#/doc/language/inline>), declarações [auto](<#/doc/language/auto>), referências e especializações de modelos de classe. (assim, quando a função inline que é objeto de uma declaração de instanciação explícita é ODR-usada, ela é implicitamente instanciada para inlining, mas sua cópia out-of-line não é gerada nesta unidade de tradução)

A definição de instanciação explícita de um modelo de função com [argumentos padrão](<#/doc/language/default_arguments>) não é um uso dos argumentos e não tenta inicializá-los:
```cpp
    char* p = 0;
    
    template<class T>
    T g(T x = &p) { return x; }
    
    template int g<int>(int); // OK even though &p isn’t an int.
```

#### Instanciação implícita

Quando o código se refere a uma função em um contexto que exige que [a definição da função exista](<#/doc/language/definition>), ou se a existência da definição afeta a semântica do programa (desde C++11), e esta função em particular não foi explicitamente instanciada, ocorre a instanciação implícita. A lista de argumentos de modelo não precisa ser fornecida se puder ser [deduzida](<#/doc/language/template_argument_deduction>) do contexto.

Execute este código
```cpp
    #include <iostream>
    
    template<typename T>
    void f(T s)
    {
        std::cout << s << '\n';
    }
    
    int main()
    {
        f<double>(1); // instantiates and calls f<double>(double)
        f<>('a');     // instantiates and calls f<char>(char)
        f(7);         // instantiates and calls f<int>(int)
        void (*pf)(std::string) = f; // instantiates f<string>(string)
        pf("∇");                     // calls f<string>(string)
    }
```

A existência de uma definição de função é considerada para afetar a semântica do programa se a função for [necessária para avaliação constante](<#/doc/language/constant_expression>) por uma expressão, mesmo que a avaliação constante da expressão não seja exigida ou se a avaliação da expressão constante não use a definição.
```cpp
    template<typename T>
    constexpr int f() { return T::value; }
    
    template<bool B, typename T>
    void g(decltype(B ? f<T>() : 0));
    template<bool B, typename T>
    void g(...);
    
    template<bool B, typename T>
    void h(decltype(int{B ? f<T>() : 0}));
    template<bool B, typename T>
    void h(...);
    
    void x()
    {
        g<false, int>(0); // OK: B ? f<T>() : 0 is not potentially constant evaluated
        h<false, int>(0); // error: instantiates f<int> even though B evaluates to false
                          // and list-initialization of int from int cannot be narrowing
    }
```

| (desde C++11)

Nota: omitir `<>` inteiramente permite que a [resolução de sobrecarga](<#/doc/language/overload_resolution>) examine tanto sobrecargas de modelo quanto não-modelo.

### Dedução de argumento de modelo

Para instanciar um modelo de função, cada argumento de modelo deve ser conhecido, mas nem todo argumento de modelo precisa ser especificado. Quando possível, o compilador deduzirá os argumentos de modelo ausentes a partir dos argumentos da função. Isso ocorre quando uma chamada de função é tentada e quando um endereço de um modelo de função é obtido.
```cpp
    template<typename To, typename From>
    To convert(From f);
    
    void g(double d) 
    {
        int i = convert<int>(d);    // calls convert<int,double>(double)
        char c = convert<char>(d);  // calls convert<char,double>(double)
        int(*ptr)(float) = convert; // instantiates convert<int, float>(float)
    }
```

Este mecanismo possibilita o uso de operadores de modelo, já que não há sintaxe para especificar argumentos de modelo para um operador a não ser reescrevendo-o como uma expressão de chamada de função.
```cpp
    #include <iostream>
    
    int main() 
    {
        std::cout << "Hello, world" << std::endl;
        // operator<< is looked up via ADL as std::operator<<,
        // then deduced to operator<<<char, std::char_traits<char>> both times
        // std::endl is deduced to &std::endl<char, std::char_traits<char>>
    }
```

A dedução de argumento de modelo ocorre após a [busca de nome](<#/doc/language/lookup>) do modelo de função (que pode envolver [busca dependente de argumento](<#/doc/language/adl>)) e antes da [resolução de sobrecarga](<#/doc/language/overload_resolution>).

Veja [dedução de argumento de modelo](<#/doc/language/template_argument_deduction>) para detalhes.

### Argumentos de modelo explícitos

Argumentos de modelo de um modelo de função podem ser obtidos de

  * dedução de argumento de modelo
  * argumentos de modelo padrão
  * especificados explicitamente, o que pode ser feito nos seguintes contextos:

    

  * em uma expressão de chamada de função
  * quando um endereço de uma função é obtido
  * quando uma referência a uma função é inicializada
  * quando um ponteiro para função membro é formado
  * em uma especialização explícita
  * em uma instanciação explícita
  * em uma declaração friend

Não há como especificar explicitamente argumentos de modelo para [operadores sobrecarregados](<#/doc/language/operators>), [funções de conversão](<#/doc/language/cast_operator>) e construtores, porque eles são chamados sem o uso do nome da função.

Os argumentos de modelo especificados devem corresponder aos parâmetros de modelo em tipo (ou seja, tipo para tipo, não-tipo para não-tipo e modelo para modelo). Não pode haver mais argumentos do que parâmetros (a menos que um parâmetro seja um parameter pack, caso em que deve haver um argumento para cada parâmetro não-pack) (desde C++11).

Os argumentos não-tipo especificados devem corresponder aos tipos dos parâmetros de modelo não-tipo correspondentes, ou ser [convertíveis a eles](<#/doc/language/template_parameters>).

Os parâmetros de função que não participam da dedução de argumento de modelo (por exemplo, se os argumentos de modelo correspondentes forem explicitamente especificados) estão sujeitos a conversões implícitas para o tipo do parâmetro de função correspondente (como na [resolução de sobrecarga](<#/doc/language/overload_resolution>) usual).

Um parameter pack de modelo que é explicitamente especificado pode ser estendido por dedução de argumento de modelo se houver argumentos adicionais:
```cpp
    template<class... Types>
    void f(Types... values);
    
    void g()
    {
        f<int*, float*>(0, 0, 0); // Types = {int*, float*, int}
    }
```

| (desde C++11)

### Substituição de argumento de modelo

Quando todos os argumentos de modelo foram especificados, deduzidos ou obtidos de argumentos de modelo padrão, cada uso de um parâmetro de modelo na lista de parâmetros da função é substituído pelos argumentos de modelo correspondentes.

A falha de substituição (ou seja, a falha em substituir parâmetros de modelo pelos argumentos de modelo deduzidos ou fornecidos) de um modelo de função remove o modelo de função do [conjunto de sobrecarga](<#/doc/language/overload_resolution>). Isso permite várias maneiras de manipular conjuntos de sobrecarga usando metaprogramação de modelo: veja [SFINAE](<#/doc/language/sfinae>) para detalhes.

Após a substituição, todos os parâmetros de função de tipo array e função são ajustados para ponteiros e todos os qualificadores cv de nível superior são removidos dos parâmetros de função (como em uma [declaração de função](<#/doc/language/function>) regular).

A remoção dos qualificadores cv de nível superior não afeta o tipo do parâmetro como ele aparece dentro da função:
```cpp
    template<class T>
    void f(T t);
    
    template<class X>
    void g(const X x);
    
    template<class Z>
    void h(Z z, Z* zp);
    
    // two different functions with the same type, but 
    // within the function, t has different cv qualifications
    f<int>(1);       // function type is void(int), t is int
    f<const int>(1); // function type is void(int), t is const int
    
    // two different functions with the same type and the same x
    // (pointers to these two functions are not equal,
    //  and function-local statics would have different addresses)
    g<int>(1);       // function type is void(int), x is const int
    g<const int>(1); // function type is void(int), x is const int
    
    // only top-level cv-qualifiers are dropped:
    h<const int>(1, NULL); // function type is void(int, const int*) 
                           // z is const int, zp is const int*
```

### Sobrecarga de modelo de função

Modelos de função e funções não-modelo podem ser sobrecarregados.

Uma função não-modelo é sempre distinta de uma especialização de modelo com o mesmo tipo. Especializações de diferentes modelos de função são sempre distintas entre si, mesmo que tenham o mesmo tipo. Dois modelos de função com o mesmo tipo de retorno e a mesma lista de parâmetros são distintos e podem ser diferenciados por sua lista explícita de argumentos de modelo.

Quando uma expressão que usa parâmetros de modelo de tipo ou não-tipo aparece na lista de parâmetros da função ou no tipo de retorno, essa expressão permanece parte da assinatura do modelo de função para fins de sobrecarga:
```cpp
    template<int I, int J>
    A<I+J> f(A<I>, A<J>); // overload #1
    
    template<int K, int L>
    A<K+L> f(A<K>, A<L>); // same as #1
    
    template<int I, int J>
    A<I-J> f(A<I>, A<J>); // overload #2
```

Duas expressões envolvendo parâmetros de modelo são chamadas de _equivalentes_ se duas definições de função que contêm essas expressões seriam as mesmas sob [ODR](<#/doc/language/definition>), ou seja, as duas expressões contêm a mesma sequência de tokens cujos nomes são resolvidos para as mesmas entidades via busca de nome, exceto que os parâmetros de modelo podem ter nomes diferentes. Duas [expressões lambda](<#/doc/language/lambda>) nunca são equivalentes. (desde C++20)
```cpp
    template<int I, int J>
    void f(A<I+J>); // template overload #1
    
    template<int K, int L>
    void f(A<K+L>); // equivalent to #1
```

Ao determinar se duas [expressões dependentes](<#/doc/language/dependent_name>) são equivalentes, apenas os nomes dependentes envolvidos são considerados, não os resultados da busca de nome. Se múltiplas declarações do mesmo modelo diferem no resultado da busca de nome, a primeira declaração é usada:
```cpp
    template<class T>
    decltype(g(T())) h(); // decltype(g(T())) is a dependent type
    
    int g(int);
    
    template<class T>
    decltype(g(T())) h()
    {                  // redeclaration of h() uses earlier lookup
        return g(T()); // although the lookup here does find g(int)
    }
    
    int i = h<int>(); // template argument substitution fails; g(int)
                      // was not in scope at the first declaration of h()
```

Dois modelos de função são considerados _equivalentes_ se

  * eles são declarados no mesmo escopo
  * eles têm o mesmo nome
  * eles têm listas de parâmetros de modelo _equivalentes_, o que significa que as listas têm o mesmo comprimento, e para cada par de parâmetros correspondente, tudo o que segue é verdadeiro:

    

  * os dois parâmetros são do mesmo tipo (ambos tipos, ambos não-tipos, ou ambos modelos)

    

  * eles são ambos parameter packs ou nenhum deles

| (desde C++11)

    

  * se não-tipo, seus tipos são equivalentes,
  * se modelo, seus parâmetros de modelo são equivalentes,

    

  * se um é declarado com concept-name, ambos são, e os concept-names são equivalentes.

| (desde C++20)

  * as expressões envolvendo parâmetros de modelo em seus tipos de retorno e listas de parâmetros são _equivalentes_

  * as expressões em suas cláusulas requires que seguem as listas de parâmetros de modelo, se presentes, são equivalentes
  * as expressões em suas cláusulas requires que seguem os declaradores de função, se presentes, são equivalentes

| (desde C++20)

Duas expressões [potencialmente avaliadas](<#/doc/language/expressions>) (desde C++20) envolvendo parâmetros de modelo são chamadas de _funcionalmente equivalentes_ se não forem _equivalentes_, mas para qualquer conjunto dado de argumentos de modelo, a avaliação das duas expressões resulta no mesmo valor.

Dois modelos de função são considerados _funcionalmente equivalentes_ se forem _equivalentes_, exceto que uma ou mais expressões que envolvem parâmetros de modelo em seus tipos de retorno e listas de parâmetros são _funcionalmente equivalentes_.

Além disso, dois modelos de função são _funcionalmente equivalentes_ mas não _equivalentes_ se suas restrições forem especificadas de forma diferente, mas eles aceitam e são satisfeitos pelo mesmo conjunto de listas de argumentos de modelo. | (desde C++20)

Se um programa contém declarações de modelos de função que são _funcionalmente equivalentes_ mas não _equivalentes_, o programa é malformado; nenhum diagnóstico é exigido.
```cpp
    // equivalent
    template<int I>
    void f(A<I>, A<I+10>); // overload #1
    template<int I>
    void f(A<I>, A<I+10>); // redeclaration of overload #1
    
    // not equivalent
    template<int I>
    void f(A<I>, A<I+10>); // overload #1
    template<int I>
    void f(A<I>, A<I+11>); // overload #2
    
    // functionally-equivalent but not equivalent
    // This program is ill-formed, no diagnostic required
    template<int I>
    void f(A<I>, A<I+10>);      // overload #1
    template<int I>
    void f(A<I>, A<I+1+2+3+4>); // functionally equivalent
```

Quando a mesma especialização de modelo de função corresponde a mais de um modelo de função sobrecarregado (isso frequentemente resulta da [dedução de argumento de modelo](<#/doc/language/template_argument_deduction>)), a _ordenação parcial de modelos de função sobrecarregados_ é realizada para selecionar a melhor correspondência.

Especificamente, a ordenação parcial ocorre nas seguintes situações:

1) [resolução de sobrecarga](<#/doc/language/overload_resolution>) para uma chamada a uma especialização de modelo de função:
```cpp
    template<class X>
    void f(X a);
    template<class X>
    void f(X* a);
    
    int* p;
    f(p);
```

2) quando o [endereço de uma especialização de modelo de função](<#/doc/language/overloaded_address>) é obtido:
```cpp
    template<class X>
    void f(X a);
    template<class X>
    void f(X* a);
    
    void (*p)(int*) = &f;
```

3) quando um [placement operator delete](<#/doc/memory/new/operator_delete>) que é uma especialização de modelo de função é selecionado para corresponder a um placement operator new: | Esta seção está incompleta
Razão: mini-exemplo

4) quando uma [declaração de função friend](<#/doc/language/friend>), uma [instanciação explícita](<#/doc/language/function_template>), ou uma [especialização explícita](<#/doc/language/template_specialization>) se refere a uma especialização de modelo de função:
```cpp
    template<class X>
    void f(X a);  // first template f
    template<class X>
    void f(X* a); // second template f
    template<>
    void f<>(int *a) {} // explicit specialization
    
    // template argument deduction comes up with two candidates:
    // f<int*>(int*) and f<int>(int*)
    // partial ordering selects f<int>(int*) as more specialized
```

Informalmente, "A é mais especializado que B" significa "A aceita menos tipos que B".

Formalmente, para determinar qual de quaisquer dois modelos de função é mais especializado, o processo de ordenação parcial primeiro transforma um dos dois modelos da seguinte forma:

  * Para cada tipo, não-tipo e parâmetro de modelo, incluindo parameter packs (desde C++11), um tipo, valor ou modelo fictício único é gerado e substituído no tipo de função do modelo.
  * Se apenas um dos dois modelos de função sendo comparados for uma função membro, e esse modelo de função for um membro não-estático de alguma classe `A`, um novo primeiro parâmetro é inserido em sua lista de parâmetros. Dado _cv_ como os qualificadores cv do modelo de função e _ref_ como o ref-qualifier do modelo de função (desde C++11), o novo tipo de parâmetro é _cv_ `A&` a menos que _ref_ seja `&&`, ou _ref_ não esteja presente e o primeiro parâmetro do outro modelo tenha tipo de referência rvalue, neste caso o tipo é _cv_ `A&&` (desde C++11). Isso ajuda na ordenação de operadores, que são buscados tanto como funções membro quanto como funções não-membro:

```cpp
    struct A {};
    
    template<class T>
    struct B
    {
        template<class R>
        int operator*(R&); // #1
    };
    
    template<class T, class R>
    int operator*(T&, R&); // #2
    
    int main()
    {
        A a;
        B<A> b;
        b * a; // template argument deduction for int B<A>::operator*(R&) gives R=A 
               //                             for int operator*(T&, R&), T=B<A>, R=A
    
        // For the purpose of partial ordering, the member template B<A>::operator*
        // is transformed into template<class R> int operator*(B<A>&, R&);
    
        // partial ordering between 
        //     int operator*(   T&, R&)  T=B<A>, R=A
        // and int operator*(B<A>&, R&)  R=A 
        // selects int operator*(B<A>&, A&) as more specialized
    }
```

Depois que um dos dois modelos foi transformado conforme descrito acima, a [dedução de argumento de modelo](<#/doc/language/template_argument_deduction>) é executada usando o modelo transformado como o modelo de argumento e o tipo de modelo original do outro modelo como o modelo de parâmetro. O processo é então repetido usando o segundo modelo (após as transformações) como o argumento e o primeiro modelo em sua forma original como o parâmetro.

Os tipos usados para determinar a ordem dependem do contexto:

  * no contexto de uma chamada de função, os tipos são aqueles tipos de parâmetros de função para os quais a chamada de função tem argumentos (argumentos de função padrão, parameter packs (desde C++11) e parâmetros de reticências não são considerados -- veja exemplos abaixo)
  * no contexto de uma chamada para uma função de conversão definida pelo usuário, os tipos de retorno dos modelos de função de conversão são usados
  * em outros contextos, o tipo do modelo de função é usado

Cada tipo da lista acima do modelo de parâmetro é deduzido. Antes do início da dedução, cada parâmetro `P` do modelo de parâmetro e o argumento `A` correspondente do modelo de argumento são ajustados da seguinte forma:

  * Se ambos `P` e `A` são tipos de referência antes, determine qual é mais cv-qualificado (em todos os outros casos, as cv-qualificações são ignoradas para fins de ordenação parcial)
  * Se `P` é um tipo de referência, ele é substituído pelo tipo referenciado
  * Se `A` é um tipo de referência, ele é substituído pelo tipo referenciado
  * Se `P` é cv-qualificado, `P` é substituído pela versão cv-não-qualificada de si mesmo
  * Se `A` é cv-qualificado, `A` é substituído pela versão cv-não-qualificada de si mesmo

Após esses ajustes, a dedução de `P` a partir de `A` é feita seguindo a [dedução de argumento de modelo a partir de um tipo](<#/doc/language/template_argument_deduction>).

Se `P` é um parameter pack de função, o tipo `A` de cada tipo de parâmetro restante do modelo de argumento é comparado com o tipo `P` do declarator-id do parameter pack de função. Cada comparação deduz argumentos de modelo para posições subsequentes nos parameter packs de modelo expandidos pelo parameter pack de função. Se `A` foi transformado de um parameter pack de função, ele é comparado com cada tipo de parâmetro restante do modelo de parâmetro. | (desde C++11)

Se o argumento `A` do template-1 transformado pode ser usado para deduzir o parâmetro `P` correspondente do template-2, mas não vice-versa, então este `A` é mais especializado que `P` em relação ao(s) tipo(s) que são deduzidos por este par `P/A`.

Se a dedução for bem-sucedida em ambas as direções, e os `P` e `A` originais eram tipos de referência, então testes adicionais são feitos:

  * Se `A` era uma referência lvalue e `P` era uma referência rvalue, `A` é considerado mais especializado que `P`
  * Se `A` era mais cv-qualificado que `P`, `A` é considerado mais especializado que `P`

Em todos os outros casos, nenhum modelo é mais especializado que o outro em relação ao(s) tipo(s) deduzido(s) por este par `P/A`.

Após considerar cada `P` e `A` em ambas as direções, se, para cada tipo que foi considerado,

  * o template-1 é pelo menos tão especializado quanto o template-2 para todos os tipos
  * o template-1 é mais especializado que o template-2 para alguns tipos
  * o template-2 não é mais especializado que o template-1 para nenhum tipo OU não é pelo menos tão especializado para nenhum tipo

Então o template-1 é mais especializado que o template-2. Se as condições acima forem verdadeiras após inverter a ordem dos modelos, então o template-2 é mais especializado que o template-1. Caso contrário, nenhum modelo é mais especializado que o outro.

Em caso de empate, se um modelo de função tem um parameter pack final e o outro não, aquele com o parâmetro omitido é considerado mais especializado que aquele com o parameter pack vazio. | (desde C++11)

Se, após considerar todos os pares de modelos sobrecarregados, houver um que seja inequivocamente mais especializado que todos os outros, a especialização desse modelo é selecionada, caso contrário a compilação falha.

Nos exemplos a seguir, os argumentos fictícios serão chamados U1, U2:
```cpp
    template<class T>
    void f(T);        // template #1
    template<class T>
    void f(T*);       // template #2
    template<class T>
    void f(const T*); // template #3
    
    void m()
    {
        const int* p;
        f(p); // overload resolution picks: #1: void f(T ) [T = const int *]
              //                            #2: void f(T*) [T = const int]
              //                            #3: void f(const T *) [T = int]
    
        // partial ordering:
    
        // #1 from transformed #2: void(T) from void(U1*): P=T A=U1*: deduction ok: T=U1*
        // #2 from transformed #1: void(T*) from void(U1): P=T* A=U1: deduction fails
        // #2 is more specialized than #1 with regards to T
    
        // #1 from transformed #3: void(T) from void(const U1*): P=T, A=const U1*: ok
        // #3 from transformed #1: void(const T*) from void(U1): P=const T*, A=U1: fails
        // #3 is more specialized than #1 with regards to T
    
        // #2 from transformed #3: void(T*) from void(const U1*): P=T* A=const U1*: ok
        // #3 from transformed #2: void(const T*) from void(U1*): P=const T* A=U1*: fails
        // #3 is more specialized than #2 with regards to T
    
        // result: #3 is selected
        // in other words, f(const T*) is more specialized than f(T) or f(T*)
    }
```
```cpp
    template<class T>
    void f(T, T*);   // #1
    template<class T>
    void f(T, int*); // #2
    
    void m(int* p)
    {
        f(0, p); // deduction for #1: void f(T, T*) [T = int]
                 // deduction for #2: void f(T, int*) [T = int]
    
        // partial ordering:
    
        // #1 from #2: void(T,T*) from void(U1,int*): P1=T, A1=U1: T=U1
        //                                            P2=T*, A2=int*: T=int: fails
    
        // #2 from #1: void(T,int*) from void(U1,U2*): P1=T A1=U1: T=U1
        //                                             P2=int* A2=U2*: fails
    
        // neither is more specialized w.r.t T, the call is ambiguous
    }
```
```cpp
    template<class T>
```cpp
    void g(T);  // template #1
    template<class T>
    void g(T&); // template #2
     
    void m()
    {
        float x;
        g(x); // dedução de #1: void g(T ) [T = float]
              // dedução de #2: void g(T&) [T = float]
     
        // ordenação parcial:
     
        // #1 de #2: void(T) de void(U1&): P=T, A=U1 (após ajuste), ok
     
        // #2 de #1: void(T&) de void(U1): P=T (após ajuste), A=U1: ok
     
        // nenhum é mais especializado em relação a T, a chamada é ambígua
    }
```
```cpp
    template<class T>
    struct A { A(); };
     
    template<class T>
    void h(const T&); // #1
    template<class T>
    void h(A<T>&);    // #2
     
    void m()
    {
        A<int> z;
        h(z); // dedução de #1: void h(const T &) [T = A<int>]
              // dedução de #2: void h(A<T> &) [T = int]
     
        // ordenação parcial:
     
        // #1 de #2: void(const T&) de void(A<U1>&): P=T A=A<U1>: ok T=A<U1>
     
        // #2 de #1: void(A<T>&) de void(const U1&): P=A<T> A=const U1: falha
     
        // #2 é mais especializado que #1 em relação a T
     
        const A<int> z2;
        h(z2); // dedução de #1: void h(const T&) [T = A<int>]
               // dedução de #2: void h(A<T>&) [T = int], mas a substituição falha
     
        // apenas uma sobrecarga para escolher, ordenação parcial não tentada, #1 é chamado
    }
```

Como um contexto de chamada considera apenas parâmetros para os quais existem argumentos de chamada explícitos, aqueles pacotes de parâmetros de função, (desde C++11) parâmetros de reticências e parâmetros com argumentos padrão, para os quais não há argumento de chamada explícito, são ignorados:
```cpp
    template<class T>
    void f(T);         // #1
    template<class T>
    void f(T*, int = 1); // #2
     
    void m(int* ip)
    {
        int* ip;
        f(ip); // chama #2 (T* é mais especializado que T)
    }
```
```cpp
    template<class T>
    void g(T);       // #1
    template<class T>
    void g(T*, ...); // #2
     
    void m(int* ip)
    {
        g(ip); // chama #2 (T* é mais especializado que T)
    }
```
```cpp
    template<class T, class U>
    struct A {};
     
    template<class T, class U>
    void f(U, A<U, T>* p = 0); // #1
    template<class U>
    void f(U, A<U, U>* p = 0); // #2
     
    void h()
    {
        f<int>(42, (A<int, int>*)0); // chama #2
        f<int>(42);                  // erro: ambíguo
    }
```
```cpp
    template<class T>
    void g(T, T = T()); // #1
    template<class T, class... U>
    void g(T, U...);    // #2
     
    void h()
    {
        g(42); // erro: ambíguo
    }
```
```cpp
    template<class T, class... U>
    void f(T, U...); // #1
    template<class T>
    void f(T);       // #2
     
    void h(int i)
    {
        f(&i); // chama #2 devido ao desempate entre pacote de parâmetros e nenhum parâmetro
               // (nota: era ambíguo entre DR692 e DR1395)
    }
```
```cpp
    template<class T, class... U>
    void g(T*, U...); // #1
    template<class T>
    void g(T);        // #2
     
    void h(int i)
    {
        g(&i); // OK: chama #1 (T* é mais especializado que T)
    }
```
```cpp
    template<class... T>
    int f(T*...);    // #1
    template<class T>
    int f(const T&); // #2
     
    f((int*)0); // OK: seleciona #2; template não-variádico é mais especializado que
                // template variádico (era ambíguo antes de DR1395 porque a dedução
                // falhava em ambas as direções)
```
```cpp
    template<class... Args>
    void f(Args... args);        // #1
    template<class T1, class... Args>
    void f(T1 a1, Args... args); // #2
    template<class T1, class T2>
    void f(T1 a1, T2 a2);        // #3
     
    f();        // chama #1
    f(1, 2, 3); // chama #2
    f(1, 2);    // chama #3; template não-variádico #3 é mais
                // especializado que os templates variádicos #1 e #2
```

Durante a dedução de argumentos de template dentro do processo de ordenação parcial, os parâmetros de template não precisam ser correspondidos com argumentos, se o argumento não for usado em nenhum dos tipos considerados para ordenação parcial
```cpp
    template<class T>
    T f(int); // #1
    template<class T, class U>
    T f(U);   // #2
     
    void g()
    {
        f<int>(1); // especialização de #1 é explícita: T f(int) [T = int]
                   // especialização de #2 é deduzida:  T f(U) [T = int, U = int]
     
        // ordenação parcial (considerando apenas o tipo do argumento):
     
        // #1 de #2: T(int) de U1(U2): falha
        // #2 de #1: T(U) de U1(int): ok: U=int, T não usado
     
        // chama #1
    }
```

A ordenação parcial de function templates contendo pacotes de parâmetros de template é independente do número de argumentos deduzidos para esses pacotes de parâmetros de template.
```cpp
    template<class...>
    struct Tuple {};
     
    template<class... Types>
    void g(Tuple<Types...>);      // #1
    template<class T1, class... Types>
    void g(Tuple<T1, Types...>);  // #2
    template<class T1, class... Types>
    void g(Tuple<T1, Types&...>); // #3
     
    g(Tuple<>());            // chama #1
    g(Tuple<int, float>());  // chama #2
    g(Tuple<int, float&>()); // chama #3
    g(Tuple<int>());         // chama #3
```

| (desde C++11)
---|---
| Esta seção está incompleta
Razão: 14.8.3[temp.over]
---|---

Para compilar uma chamada a um function template, o compilador precisa decidir entre sobrecargas não-template, sobrecargas de template e as especializações das sobrecargas de template.
```cpp
    template<class T>
    void f(T);      // #1: sobrecarga de template
    template<class T>
    void f(T*);     // #2: sobrecarga de template
     
    void f(double); // #3: sobrecarga não-template
    template<>
    void f(int);    // #4: especialização de #1
     
    f('a');        // chama #1
    f(new int(1)); // chama #2
    f(1.0);        // chama #3
    f(1);          // chama #4
```

### Sobrecargas de função vs especializações de função

Note que apenas sobrecargas não-template e de template primário participam da resolução de sobrecarga. As especializações não são sobrecargas e não são consideradas. Somente depois que a resolução de sobrecarga seleciona o function template primário de melhor correspondência, suas especializações são examinadas para ver se uma delas é uma correspondência melhor.
```cpp
    template<class T>
    void f(T);    // #1: sobrecarga para todos os tipos
    template<>
    void f(int*); // #2: especialização de #1 para ponteiros para int
    template<class T>
    void f(T*);   // #3: sobrecarga para todos os tipos de ponteiro
     
    f(new int(1)); // chama #3, mesmo que a especialização de #1 fosse uma correspondência perfeita
```

É importante lembrar esta regra ao ordenar os arquivos de cabeçalho de uma unidade de tradução. Para mais exemplos da interação entre sobrecargas de função e especializações de função, expanda abaixo:

Exemplos
---
Considere primeiro alguns cenários onde a pesquisa dependente de argumento (argument-dependent lookup) não é empregada. Para isso, usamos a chamada (f)(t). Conforme descrito em ADL, envolver o nome da função entre parênteses suprime a pesquisa dependente de argumento.

  * Múltiplas sobrecargas de f() declaradas antes do _ponto de referência_ (POR) em g().

Run this code
```cpp
    #include <iostream>
     
    struct A {};
     
    template<class T>
    void f(T)  { [std::cout](<#/doc/io/cout>) << "#1\n"; } // sobrecarga #1 antes do POR de f()
    template<class T>
    void f(T*) { [std::cout](<#/doc/io/cout>) << "#2\n"; } // sobrecarga #2 antes do POR de f()
     
    template<class T>
    void g(T* t) 
    {
        (f)(t); // POR de f()
    }
     
    int main()
    {
        A* p = nullptr;
        g(p); // POR de g() e f()
    }
     
    // Ambos #1 e #2 são adicionados à lista de candidatos;
    // #2 é selecionado porque é uma correspondência melhor.
```

Saída:
```cpp
    #2
```

  

  * Uma sobrecarga de template de melhor correspondência é declarada após o POR.

Run this code
```cpp
    #include <iostream>
     
    struct A {};
     
    template<class T>
    void f(T)  { [std::cout](<#/doc/io/cout>) << "#1\n"; } // #1
     
    template<class T>
    void g(T* t) 
    {
        (f)(t); // POR de f()
    }
     
    template<class T>
    void f(T*) { [std::cout](<#/doc/io/cout>) << "#2\n"; } // #2
     
    int main()
    {
        A* p = nullptr;
        g(p); // POR de g() e f()
    }
     
    // Apenas #1 é adicionado à lista de candidatos; #2 é definido após o POR;
    // portanto, não é considerado para sobrecarga, mesmo que seja uma correspondência melhor.
```

Saída:
```cpp
    #1
```

  

  * Uma especialização explícita de template de melhor correspondência é declarada após o POR.

Run this code
```cpp
    #include <iostream>
     
    struct A {};
     
    template<class T>
    void f(T)    { [std::cout](<#/doc/io/cout>) << "#1\n"; } // #1
     
    template<class T>
    void g(T* t) 
    {
        (f)(t); // POR de f()
    }
    template<>
    void f<>(A*) { [std::cout](<#/doc/io/cout>) << "#3\n"; } // #3
     
    int main()
    {
        A* p = nullptr;
        g(p); // POR de g() e f()
    }
     
    // #1 é adicionado à lista de candidatos; #3 é uma correspondência melhor definida após o POR. A
    // lista de candidatos consiste em #1 que é eventualmente selecionado. Depois disso, a especialização 
    // explícita #3 de #1 declarada após o POI é selecionada porque é uma correspondência melhor. 
    // Este comportamento é regido por 14.7.3/6 [temp.expl.spec] e não tem nada a ver com ADL.
```

Saída:
```cpp
    #3
```

  

  * Uma sobrecarga de template de melhor correspondência é declarada após o POR. A melhor especialização explícita de template correspondente é declarada após a sobrecarga de melhor correspondência.

Run this code
```cpp
    #include <iostream>
     
    struct A {};
     
    template<class T>
    void f(T)    { [std::cout](<#/doc/io/cout>) << "#1\n"; } // #1
     
    template<class T>
    void g(T* t) 
    {
        (f)(t); // POR de f()
    }
     
    template<class T>
    void f(T*)   { [std::cout](<#/doc/io/cout>) << "#2\n"; } // #2
    template<>
    void f<>(A*) { [std::cout](<#/doc/io/cout>) << "#3\n"; } // #3
     
    int main()
    {
        A* p = nullptr;
        g(p); // POR de g() e f()
    }
     
    // #1 é o único membro da lista de candidatos e é eventualmente selecionado. 
    // Depois disso, a especialização explícita #3 é ignorada porque ela realmente 
    // especializa #2 declarado após o POR.
```

Saída:
```cpp
    #1
```

  
Vamos considerar agora os casos que empregam a pesquisa dependente de argumento (argument-dependent lookup) (ou seja, usamos o formato de chamada mais comum f(t)).

  * Uma sobrecarga de template de melhor correspondência é declarada após o POR.

Run this code
```cpp
    #include <iostream>
     
    struct A {};
     
    template<class T>
    void f(T)  { [std::cout](<#/doc/io/cout>) << "#1\n"; } // #1
     
    template<class T>
    void g(T* t) 
    {
        f(t); // POR de f()
    }
     
    template<class T>
    void f(T*) { [std::cout](<#/doc/io/cout>) << "#2\n"; } // #2
     
    int main()
    {
        A* p = nullptr;
        g(p); // POR de g() e f()
    }
     
    // #1 é adicionado à lista de candidatos como resultado da pesquisa ordinária;
    // #2 é definido após o POR, mas é adicionado à lista de candidatos via pesquisa ADL.
    // #2 é selecionado por ser a melhor correspondência.
```

Saída:
```cpp
    #2
```

  

  * Uma sobrecarga de template de melhor correspondência é declarada após o POR. A melhor especialização explícita de template correspondente é declarada antes da sobrecarga de melhor correspondência.

Run this code
```cpp
    #include <iostream>
     
    struct A {};
     
    template<class T>
    void f(T)    { [std::cout](<#/doc/io/cout>) << "#1\n"; } // #1
     
    template<class T>
    void g(T* t) 
    {
        f(t); // POR de f()
    }
     
    template<>
    void f<>(A*) { [std::cout](<#/doc/io/cout>) << "#3\n"; } // #3
    template<class T>
    void f(T*)   { [std::cout](<#/doc/io/cout>) << "#2\n"; } // #2
     
    int main()
    {
        A* p = nullptr;
        g(p); // POR de g() e f()
    }
     
    // #1 é adicionado à lista de candidatos como resultado da pesquisa ordinária;
    // #2 é definido após o POR, mas é adicionado à lista de candidatos via pesquisa ADL.
    // #2 é selecionado entre os templates primários, sendo a melhor correspondência.
    // Como #3 é declarado antes de #2, é uma especialização explícita de #1.
    // Portanto, a seleção final é #2.
```

Saída:
```cpp
    #2
```

  

  * Uma sobrecarga de template de melhor correspondência é declarada após o POR. A melhor especialização explícita de template correspondente é declarada por último.

Run this code
```cpp
    #include <iostream>
     
    struct A {};
     
    template<class T>
    void f(T)    { [std::cout](<#/doc/io/cout>) << "#1\n"; } // #1
     
    template<class T>
    void g(T* t) 
    {
        f(t); // POR de f()
    }
     
    template<class T>
    void f(T*)   { [std::cout](<#/doc/io/cout>) << "#2\n"; } // #2
    template<>
    void f<>(A*) { [std::cout](<#/doc/io/cout>) << "#3\n"; } // #3
     
    int main()
    {
        A* p = nullptr;
        g(p); // POR de g() e f()
    }
     
    // #1 é adicionado à lista de candidatos como resultado da pesquisa ordinária;
    // #2 é definido após o POR, mas é adicionado à lista de candidatos via pesquisa ADL.
    // #2 é selecionado entre os templates primários, sendo a melhor correspondência.
    // Como #3 é declarado após #2, é uma especialização explícita de #2;
    // portanto, selecionado como a função a ser chamada.
```

Saída:
```cpp
    #3
```

  
Sempre que os argumentos são alguns tipos básicos de C++, não há namespaces associados a ADL. Consequentemente, esses cenários são idênticos aos exemplos não-ADL acima.
  
Para regras detalhadas sobre resolução de sobrecarga, consulte resolução de sobrecarga.

### Especialização de function template

| Esta seção está incompleta
Razão: 14.8[temp.fct.spec] (note que 14.8.1[temp.arg.explicit] já está no artigo de especialização completa: ou especificidades de função vão aqui: falta de parciais, interação com sobrecargas de função, ou apenas se refere a isso
---|---

### Palavras-chave

`template`, `extern` (desde C++11)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto
---|---|---|---
CWG 214 | C++98  | o procedimento exato de ordenação parcial não foi especificado  | especificação adicionada
CWG 532 | C++98  | a ordem entre um function template membro não-estático
e um function template não-membro não foi especificada  | especificação adicionada
CWG 581 | C++98  | lista de argumentos de template em uma especialização explícita ou
instanciação de um constructor template era permitida  | proibido
CWG 1321 | C++98  | não estava claro se os mesmos nomes dependentes na
primeira declaração e uma redeclaração são equivalentes  | eles são equivalentes e
o significado é o mesmo que na primeira declaração
CWG 1395 | C++11  | a dedução falhou quando A era de um pacote,
e não havia desempate de pacote vazio  | dedução permitida,
desempate adicionado
CWG 1406 | C++11  | o tipo do novo primeiro parâmetro adicionado para
um function template membro não-estático era
não relevante para o ref-qualifier desse template  | o tipo é um rvalue
reference type se o ref-qualifier for `&&`
CWG 1446 | C++11  | o tipo do novo primeiro parâmetro adicionado para um membro não-estático
function template sem ref-qualifier era um tipo de referência lvalue,
mesmo que esse function template membro seja comparado com um
function template cujo primeiro parâmetro tem tipo de referência rvalue  | o tipo é um
rvalue reference type neste caso
CWG 2373 | C++98  | novos primeiros parâmetros foram adicionados às listas de parâmetros
de function templates membros estáticos em ordenação parcial  | não adicionado

### Veja também

  * class template
  * function declaration

```