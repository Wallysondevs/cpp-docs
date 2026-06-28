# Resolução de sobrecarga

Para compilar uma chamada de função, o compilador deve primeiro realizar a [busca de nome](<#/doc/language/lookup>), que, para funções, pode envolver a [busca dependente de argumento (ADL)](<#/doc/language/adl>), e para function templates pode ser seguida pela [dedução de argumento de template](<#/doc/language/template_argument_deduction>).
  
Se o nome se refere a mais de uma entidade, diz-se que está _sobrecarregado_, e o compilador deve determinar qual sobrecarga chamar. Em termos simples, a sobrecarga cujos parâmetros correspondem mais de perto aos argumentos é a que é chamada.

Em detalhes, a resolução de sobrecarga prossegue através dos seguintes passos:

  1. Construindo o conjunto de [funções candidatas](<#/doc/language/overload_resolution>).
  2. Reduzindo o conjunto para apenas [funções viáveis](<#/doc/language/overload_resolution>).
  3. Analisando o conjunto para determinar a única [melhor função viável](<#/doc/language/overload_resolution>) (isso pode envolver o [ranqueamento de sequências de conversão implícita](<#/doc/language/overload_resolution>)).

```cpp
    void f(long);
    void f(float);
    
    f(0L); // calls f(long)
    f(0);  // error: ambiguous overload
```

Além das chamadas de função, nomes de funções sobrecarregadas podem aparecer em vários contextos adicionais, onde regras diferentes se aplicam: veja [Endereço de uma função sobrecarregada](<#/doc/language/overloaded_address>).

Se uma função não pode ser selecionada pela resolução de sobrecarga, ela não pode ser usada (por exemplo, é uma [entidade template](<#/doc/language/templates>) com uma [restrição](<#/doc/language/constraints>) falha).

### Funções candidatas

Antes que a resolução de sobrecarga comece, as funções selecionadas pela busca de nome e dedução de argumento de template são combinadas para formar o conjunto de _funções candidatas_. Os detalhes exatos dependem do contexto em que a resolução de sobrecarga ocorrerá.

#### Chamada para uma função nomeada

Se E em uma [expressão de chamada de função](<#/doc/language/operator_other>) E(args) nomeia um conjunto de funções sobrecarregadas e/ou function templates (mas não objetos chamáveis), as seguintes regras são seguidas:

  * Se a expressão E tem a forma `PA->B` ou `A.B` (onde `A` tem tipo de classe _cv_ `T`), então `B` é [buscado](<#/doc/language/lookup>) como uma função membro de `T`. As declarações de função encontradas por essa busca são as funções candidatas. A lista de argumentos para fins de resolução de sobrecarga tem o argumento de objeto implícito do tipo _cv_ `T`.
  * Se a expressão E é uma [expressão primária](<#/doc/language/expressions>), o nome é [buscado](<#/doc/language/lookup>) seguindo as regras normais para chamadas de função (o que pode envolver [ADL](<#/doc/language/adl>)). As declarações de função encontradas por essa busca são (devido à forma como a busca funciona) ou:

    

  * todas as funções não-membro (nesse caso, a lista de argumentos para fins de resolução de sobrecarga é exatamente a lista de argumentos usada na expressão de chamada de função)
  * todas as funções membro de alguma classe `T`, nesse caso, se `this` está no escopo e é um ponteiro para `T` ou para uma classe derivada de `T`, `*this` é usado como o argumento de objeto implícito. Caso contrário (se `this` não está no escopo ou não aponta para `T`), um objeto falso do tipo `T` é usado como o argumento de objeto implícito, e se a resolução de sobrecarga subsequentemente selecionar uma função membro não-estática, o programa é malformado.

#### Chamada para um objeto de classe

Se E em uma [expressão de chamada de função](<#/doc/language/operator_other>) E(args) tem tipo de classe _cv_ `T`, então

  * Os operadores de chamada de função de `T` são obtidos por [busca](<#/doc/language/lookup>) ordinária do nome `operator()` no contexto da expressão `(E).operator()`, e cada declaração encontrada é adicionada ao conjunto de funções candidatas.
  * Para cada [função de conversão definida pelo usuário](<#/doc/language/cast_operator>) não-[`explicit`](<#/doc/language/explicit>) em `T` ou em uma base de `T` (a menos que oculta), cujos qualificadores cv são os mesmos ou maiores que os qualificadores cv de `T`, e onde a função de conversão converte para:

    

  * ponteiro para função
  * referência para ponteiro para função
  * referência para função

    então uma _função de chamada substituta_ com um nome único cujo primeiro parâmetro é o resultado da conversão, os parâmetros restantes são a lista de parâmetros aceita pelo resultado da conversão, e o tipo de retorno é o tipo de retorno do resultado da conversão, é adicionada ao conjunto de funções candidatas. Se esta função substituta for selecionada pela resolução de sobrecarga subsequente, então a função de conversão definida pelo usuário será chamada e então o resultado da conversão será chamado.

Em qualquer caso, a lista de argumentos para fins de resolução de sobrecarga é a lista de argumentos da expressão de chamada de função precedida pelo argumento de objeto implícito E (ao comparar com a função substituta, a conversão definida pelo usuário converterá automaticamente o argumento de objeto implícito para o primeiro argumento da função substituta).
```cpp
    int f1(int);
    int f2(float);
    
    struct A
    {
        using fp1 = int(*)(int);
        operator fp1() { return f1; } // conversion function to pointer to function
        using fp2 = int(*)(float);
        operator fp2() { return f2; } // conversion function to pointer to function
    } a;
    
    int i = a(1); // calls f1 via pointer returned from conversion function
```

#### Chamada para um operador sobrecarregado

Se pelo menos um dos argumentos para um operador em uma expressão tem um tipo de classe ou um tipo de enumeração, tanto os [operadores embutidos](<#/doc/language/expressions>) quanto as [sobrecargas de operador definidas pelo usuário](<#/doc/language/operators>) participam da resolução de sobrecarga, com o conjunto de funções candidatas selecionado da seguinte forma:

Para um operador unário `@` cujo argumento tem tipo `T1` (após remover qualificadores cv), ou operador binário `@` cujo operando esquerdo tem tipo `T1` e operando direito tem tipo `T2` (após remover qualificadores cv), os seguintes conjuntos de funções candidatas são preparados:

1) _candidatos membro_ : se `T1` é uma classe completa ou uma classe atualmente sendo definida, o conjunto de candidatos membro é o resultado da [busca de nome qualificada](<#/doc/language/lookup>) de `T1::operator@`. Em todos os outros casos, o conjunto de candidatos membro é vazio.

2) _candidatos não-membro_ : Para os operadores onde a [sobrecarga de operador](<#/doc/language/operators>) permite formas não-membro, todas as declarações encontradas pela [busca de nome não qualificada](<#/doc/language/lookup>) de `operator@` no contexto da expressão (que pode envolver [ADL](<#/doc/language/adl>)), exceto que as declarações de função membro são ignoradas e não impedem que a busca continue para o próximo escopo envolvente. Se ambos os operandos de um operador binário ou o único operando de um operador unário tem tipo de enumeração, as únicas funções do conjunto de busca que se tornam candidatos não-membro são aquelas cujo parâmetro tem esse tipo de enumeração (ou referência a esse tipo de enumeração).

3) _candidatos embutidos_ : Para `operator,`, o operador unário `&`, e `operator->`, o conjunto de candidatos embutidos é vazio. Para outros operadores, os candidatos embutidos são aqueles listados nas [páginas de operadores embutidos](<#/doc/language/expressions>) desde que todos os operandos possam ser implicitamente convertidos para seus parâmetros. Se qualquer candidato embutido tem a mesma lista de parâmetros que um candidato não-membro ou candidato não-membro reescrito (desde C++20) que não é uma especialização de function template, ele não é adicionado à lista de candidatos embutidos. Quando os operadores de atribuição embutidos são considerados, as conversões de seus primeiros parâmetros são restritas: apenas as [sequências de conversão padrão](<#/doc/language/implicit_cast>) são consideradas.

4) _candidatos reescritos_ :

  * Para as quatro expressões de operador relacional `x < y`, `x <= y`, `x > y`, e `x >= y`, todos os `operator<=>`s membro, não-membro e embutidos encontrados são adicionados ao conjunto.
  * Para as quatro expressões de operador relacional `x < y`, `x <= y`, `x > y`, e `x >= y`, bem como a expressão de comparação de três vias `x <=> y`, um candidato sintetizado com a ordem dos dois parâmetros invertida é adicionado para cada `operator<=>`s membro, não-membro e embutido encontrado.
  * Para `x != y`, todos os `operator==`s membro, não-membro e embutidos encontrados são adicionados ao conjunto, a menos que haja um `operator!=` correspondente.
  * Para as expressões de operador de igualdade `x == y` e `x != y`, um candidato sintetizado com a ordem dos dois parâmetros invertida é adicionado para cada `operator==`s membro, não-membro e embutido encontrado, a menos que haja um `operator!=` correspondente.

Em todos os casos, os candidatos reescritos não são considerados no contexto da expressão reescrita. Para todos os outros operadores, o conjunto de candidatos reescritos é vazio. | (desde C++20)
  
O conjunto de funções candidatas a serem submetidas para resolução de sobrecarga é uma união dos conjuntos acima. A lista de argumentos para fins de resolução de sobrecarga consiste nos operandos do operador, exceto para `operator->`, onde o segundo operando não é um argumento para a chamada de função (veja [operador de acesso a membro](<#/doc/language/operator_member_access>)).
```cpp
    struct A
    {
        operator int();              // user-defined conversion
    };
    A operator+(const A&, const A&); // non-member user-defined operator
    
    void m()
    {
        A a, b;
        a + b; // member-candidates: none
               // non-member candidates: operator+(a, b)
               // built-in candidates: int(a) + int(b)
               // overload resolution chooses operator+(a, b)
    }
```

Se a resolução de sobrecarga seleciona um candidato embutido, a [sequência de conversão definida pelo usuário](<#/doc/language/implicit_cast>) de um operando de tipo de classe não pode ter uma segunda sequência de conversão padrão: a função de conversão definida pelo usuário deve fornecer o tipo de operando esperado diretamente:
```cpp
    struct Y { operator int*(); }; // Y is convertible to int*
    int *a = Y() + 100.0;          // error: no operator+ between pointer and double
```

Para `operator,`, o operador unário `&`, e `operator->`, se não houver funções viáveis (veja abaixo) no conjunto de funções candidatas, então o operador é reinterpretado como um embutido.

```cpp
Se um candidato `operator<=>` reescrito for selecionado pela resolução de sobrecarga para um operador `@`, `x @ y` é interpretado como a expressão reescrita: `0 @ (y <=> x)` se o candidato selecionado for um candidato sintetizado com ordem inversa de parâmetros, ou `(x <=> y) @ 0` caso contrário, usando o candidato `operator<=>` reescrito selecionado. Se um candidato `operator==` reescrito for selecionado pela resolução de sobrecarga para um operador `@` (que é `==` ou `!=`), seu tipo de retorno deve ser `bool` (possivelmente cv-qualificado), e `x @ y` é interpretado como a expressão reescrita: `y == x` ou `!(y == x)` se o candidato selecionado for um candidato sintetizado com ordem inversa de parâmetros, ou `!(x == y)` caso contrário, usando o candidato `operator==` reescrito selecionado. A resolução de sobrecarga neste caso tem um desempate final preferindo candidatos não-reescritos a candidatos reescritos, e preferindo candidatos reescritos não-sintetizados a candidatos reescritos sintetizados. Esta busca com a ordem inversa dos argumentos torna possível escrever apenas `operator<=>(std::string, const char*)` e `operator==(std::string, const char*)` para gerar todas as comparações entre std::string e `const char*`, em ambos os sentidos. Veja comparações padrão para mais detalhes.  // (desde C++20)
```
  
#### Inicialização por construtor

Quando um objeto de tipo de classe é [inicializado diretamente](<#/doc/language/direct_initialization>) ou [inicializado por padrão](<#/doc/language/default_initialization>) (incluindo inicialização por padrão no contexto de [inicialização de lista por cópia](<#/doc/language/list_initialization>)) (desde C++11), as funções candidatas são todos os construtores da classe sendo inicializada. A lista de argumentos é a lista de expressões do inicializador.

Caso contrário, as funções candidatas são todos os [construtores de conversão](<#/doc/language/converting_constructor>) da classe sendo inicializada. A lista de argumentos é a expressão do inicializador.

Para inicialização por padrão no contexto de inicialização de lista por cópia, se um construtor [`explicit`](<#/doc/language/explicit>) for escolhido, a inicialização é malformada. | (desde C++11)
  
#### Inicialização por cópia por conversão

Se a [inicialização por cópia](<#/doc/language/copy_initialization>) de um objeto de tipo de classe requer que uma conversão definida pelo usuário seja chamada para converter a expressão inicializadora do tipo _cv_ `S` para o tipo _cv_ `T` do objeto sendo inicializado, as seguintes funções são funções candidatas:

  * todos os [construtores de conversão](<#/doc/language/converting_constructor>) de `T`
  * as funções de conversão não-[`explicit`](<#/doc/language/explicit>) de `S` e suas classes base (a menos que ocultas) para `T` ou classe derivada de `T` ou uma referência a tal. Se esta inicialização por cópia faz parte da sequência de inicialização direta de _cv_ `T` (inicializando uma referência a ser vinculada ao primeiro parâmetro de um construtor que aceita uma referência a _cv_ `T`), então funções de conversão explícitas também são consideradas.

De qualquer forma, a lista de argumentos para fins de resolução de sobrecarga consiste em um único argumento que é a expressão inicializadora, que será comparada com o primeiro argumento do construtor ou com o argumento de objeto implícito da função de conversão.

#### Inicialização de tipo não-classe por conversão

Quando a inicialização de um objeto de tipo não-classe _cv1_ `T` requer uma [função de conversão definida pelo usuário](<#/doc/language/cast_operator>) para converter de uma expressão inicializadora de tipo de classe _cv_ `S`, as seguintes funções são candidatas:

  * as funções de conversão definidas pelo usuário não-explícitas de `S` e suas classes base (a menos que ocultas) que produzem o tipo `T` ou um tipo conversível para `T` por uma [sequência de conversão padrão](<#/doc/language/implicit_cast>), ou uma referência a tal tipo. Qualificadores cv no tipo retornado são ignorados para fins de seleção de funções candidatas.
  * se esta é uma [inicialização direta](<#/doc/language/direct_initialization>), as funções de conversão definidas pelo usuário explícitas de `S` e suas classes base (a menos que ocultas) que produzem o tipo `T` ou um tipo conversível para `T` por uma [conversão de qualificação](<#/doc/language/implicit_cast>), ou uma referência a tal tipo, também são consideradas.

De qualquer forma, a lista de argumentos para fins de resolução de sobrecarga consiste em um único argumento que é a expressão inicializadora, que será comparada com o argumento de objeto implícito da função de conversão.

#### Inicialização de referência por conversão

Durante a [inicialização de referência](<#/doc/language/reference_initialization>), onde a referência a _cv1_ `T` é vinculada ao resultado lvalue ou rvalue de uma conversão da expressão inicializadora do tipo de classe _cv2_ `S`, as seguintes funções são selecionadas para o conjunto de candidatos:

  * As funções de conversão definidas pelo usuário não-explícitas de `S` e suas classes base (a menos que ocultas) para o tipo

    

  * (ao converter para um lvalue) referência lvalue para _cv2_ `T2`
  * (ao converter para um rvalue ou um lvalue de tipo de função) _cv2_ `T2` ou referência rvalue para _cv2_ `T2`

     onde _cv2_ `T2` é [compatível com referência](<#/doc/language/reference_initialization>) com _cv1_ `T`.

  * Para inicialização direta, as funções de conversão definidas pelo usuário explícitas também são consideradas se `T2` é do mesmo tipo que `T` ou pode ser convertido para o tipo `T` com uma conversão de qualificação.

De qualquer forma, a lista de argumentos para fins de resolução de sobrecarga consiste em um único argumento que é a expressão inicializadora, que será comparada com o argumento de objeto implícito da função de conversão.

#### Inicialização de lista

Quando um objeto de tipo de classe não-agregado `T` é [inicializado por lista](<#/doc/language/list_initialization>), ocorre uma resolução de sobrecarga em duas fases.

  * na fase 1, as funções candidatas são todos os construtores de `T` que aceitam `initializer_list` e a lista de argumentos para fins de resolução de sobrecarga consiste em um único argumento `initializer_list`
  * se a resolução de sobrecarga falhar na fase 1, a fase 2 é iniciada, onde as funções candidatas são todos os construtores de `T` e a lista de argumentos para fins de resolução de sobrecarga consiste nos elementos individuais da lista inicializadora.

Se a lista inicializadora estiver vazia e `T` tiver um construtor padrão, a fase 1 é ignorada.

Na inicialização de lista por cópia, se a fase 2 selecionar um construtor explícito, a inicialização é malformada (ao contrário de todas as outras inicializações por cópia onde construtores explícitos nem são considerados).

#### Regras adicionais para candidatos a function template

Se a busca de nome encontrou um function template, a [dedução de argumento de template](<#/doc/language/template_argument_deduction>) e a verificação de quaisquer argumentos de template explícitos são realizadas para encontrar os valores de argumento de template (se houver) que podem ser usados neste caso:

  * Se ambos forem bem-sucedidos, os argumentos de template são usados para sintetizar declarações das especializações de function template correspondentes, que são adicionadas ao conjunto de candidatos, e tais especializações são tratadas exatamente como funções não-template, exceto onde especificado de outra forma nas regras de desempate abaixo.
  * Se a dedução de argumento falhar ou a especialização de function template sintetizada for malformada, nenhuma função desse tipo é adicionada ao conjunto de candidatos (veja [SFINAE](<#/doc/language/sfinae>)).

Se um nome se refere a um ou mais function templates e também a um conjunto de funções não-template sobrecarregadas, essas funções e as especializações geradas a partir dos templates são todos candidatos.

Veja [sobrecarga de function template](<#/doc/language/function_template>) para mais detalhes.

```cpp
Se um constructor template ou conversion function template tem um especificador explicit condicional que por acaso é dependente de valor, após a dedução, se o contexto requer um candidato que não é explícito e a especialização gerada é explícita, ele é removido do conjunto de candidatos.  // (desde C++20)
```
  
#### Regras adicionais para candidatos a construtor

[Construtores de movimento](<#/doc/language/move_constructor>) e [operadores de atribuição de movimento](<#/doc/language/move_operator>) padronizados que são definidos como `deleted` são excluídos do conjunto de funções candidatas. Um construtor [herdado](<#/doc/language/using_declaration>) do tipo de classe `C` que tem um primeiro parâmetro do tipo “referência para `P`” (incluindo tal construtor instanciado de um template) é excluído do conjunto de funções candidatas ao construir um objeto do tipo `D` se todas as seguintes condições forem satisfeitas:

  * A lista de argumentos tem exatamente um argumento.
  * `C` é [relacionado por referência](<#/doc/language/reference_initialization>) a `P`.
  * `P` é relacionado por referência a `D`.

| (desde C++11)
  
#### Regras adicionais para candidatos a função membro

Se qualquer função candidata é uma [função membro](<#/doc/language/member_functions>) (estática ou não-estática) que não tem um [parâmetro de objeto explícito](<#/doc/language/member_functions>) (desde C++23), mas não é um construtor, ela é tratada como se tivesse um parâmetro extra (_parâmetro de objeto implícito_) que representa o objeto para o qual são chamadas e aparece antes do primeiro dos parâmetros reais.

Similarmente, o objeto no qual uma função membro está sendo chamada é prefixado à lista de argumentos como o _argumento de objeto implícito_.

Para funções membro da classe `X`, o tipo do parâmetro de objeto implícito é afetado pelas qualificações cv e qualificações ref da função membro, conforme descrito em [funções membro](<#/doc/language/member_functions>).

As funções de conversão definidas pelo usuário são consideradas membros do _argumento de objeto implícito_ para fins de determinação do tipo do _parâmetro de objeto implícito_.

As funções membro introduzidas por uma `using-declaration` em uma classe derivada são consideradas membros da classe derivada para fins de definição do tipo do _parâmetro de objeto implícito_.

Para as funções membro estáticas, o _parâmetro de objeto implícito_ é considerado para corresponder a qualquer objeto: seu tipo não é examinado e nenhuma sequência de conversão é tentada para ele. | (até C++23)
  
Para o restante da resolução de sobrecarga, o _argumento de objeto implícito_ é indistinguível de outros argumentos, mas as seguintes regras especiais se aplicam ao _parâmetro de objeto implícito_ :

1) conversões definidas pelo usuário não podem ser aplicadas ao parâmetro de objeto implícito

2) rvalues podem ser vinculados a parâmetros de objeto implícitos não-const (a menos que seja para uma função membro ref-qualificada) (desde C++11) e não afetam o ranqueamento das conversões implícitas.
```cpp
    struct B { void f(int); };
    struct A { operator B&(); };
    
    A a;
    a.B::f(1); // Error: user-defined conversions cannot be applied
               // to the implicit object parameter
    static_cast<B&>(a).f(1); // OK
```

### Funções viáveis

Dado o conjunto de funções candidatas, construído conforme descrito acima, o próximo passo da resolução de sobrecarga é examinar argumentos e parâmetros para reduzir o conjunto ao conjunto de _funções viáveis_.

Para ser incluída no conjunto de funções viáveis, a função candidata deve satisfazer o seguinte:

1) Se houver `M` argumentos, a função candidata que tem exatamente `M` parâmetros é viável.

2) Se a função candidata tem menos de `M` parâmetros, mas tem um [parâmetro de reticências](<#/doc/language/variadic_arguments>), ela é viável.

3) Se a função candidata tem mais de `M` parâmetros e o `M+1`-ésimo parâmetro e todos os parâmetros que o seguem têm argumentos padrão, ela é viável. Para o restante da resolução de sobrecarga, a lista de parâmetros é truncada em `M`.

4) Se a função tem uma [restrição](<#/doc/language/constraints>) associada, ela deve ser satisfeita. | (desde C++20)
  
5) Para cada argumento, deve haver pelo menos uma sequência de conversão implícita que o converta para o parâmetro correspondente.

6) Se qualquer parâmetro tem tipo de referência, a vinculação de referência é considerada nesta etapa: se um argumento rvalue corresponde a um parâmetro de referência lvalue não-const ou um argumento lvalue corresponde a um parâmetro de referência rvalue, a função não é viável.

Conversões definidas pelo usuário (tanto construtores de conversão quanto funções de conversão definidas pelo usuário) são proibidas de participar de sequências de conversão implícita onde tornaria possível aplicar mais de uma conversão definida pelo usuário. Especificamente, elas não são consideradas se o alvo da conversão é o primeiro parâmetro de um construtor ou o parâmetro de objeto implícito de uma função de conversão definida pelo usuário, e esse construtor/conversão definida pelo usuário é um candidato para

  * [inicialização por cópia de uma classe por conversão definida pelo usuário](<#/doc/language/overload_resolution>),
  * [inicialização de um tipo não-classe por uma função de conversão](<#/doc/language/overload_resolution>),
  * [inicialização por função de conversão para vinculação direta de referência](<#/doc/language/overload_resolution>),
  * [inicialização por construtor](<#/doc/language/overload_resolution>) durante a segunda etapa (inicialização direta) da [inicialização por cópia](<#/doc/language/copy_initialization>) de classe,

  * inicialização por `list-initialization` onde a lista inicializadora tem exatamente um elemento que é ele próprio uma lista inicializadora, e o alvo é o primeiro parâmetro de um construtor da classe `X`, e a conversão é para `X` ou referência para `X` (possivelmente cv-qualificado):

```cpp
    struct A { A(int); };
    struct B { B(A); };
    
    B b{{0}}; // list-initialization of B
    
    // candidates: B(const B&), B(B&&), B(A)
    // {0} -> B&& not viable: would have to call B(A)
    // {0} -> const B&: not viable: would have to bind to rvalue, would have to call B(A)
    // {0} -> A viable. Calls A(int): user-defined conversion to A is not banned
```

| (desde C++11)
  
### Melhor função viável

Para cada par de funções viáveis `F1` e `F2`, as sequências de conversão implícita do `i`-ésimo argumento para o `i`-ésimo parâmetro são ranqueadas para determinar qual é melhor (exceto o primeiro argumento, o _argumento de objeto implícito_ para funções membro estáticas não tem efeito no ranqueamento).

`F1` é determinada como uma função melhor que `F2` se as conversões implícitas para todos os argumentos de `F1` não são _piores_ que as conversões implícitas para todos os argumentos de `F2`, e

1) há pelo menos um argumento de `F1` cuja conversão implícita é _melhor_ que a conversão implícita correspondente para aquele argumento de `F2`, ou, se não for isso,

2) (apenas no contexto de inicialização de tipo não-classe por conversão), a sequência de conversão padrão do resultado de `F1` para o tipo sendo inicializado é _melhor_ que a sequência de conversão padrão do resultado de `F2`, ou, se não for isso,

3) (apenas no contexto de inicialização por função de conversão para vinculação direta de referência de um tipo de referência a função), o resultado de `F1` é do mesmo tipo de referência (lvalue ou rvalue) que a referência sendo inicializada, e o resultado de `F2` não é, ou, se não for isso, | (desde C++11)
  
4) `F1` é uma função não-template enquanto `F2` é uma especialização de template, ou, se não for isso,

5) `F1` e `F2` são ambas especializações de template e `F1` é mais especializada de acordo com as [regras de ordenação parcial para especializações de template](<#/doc/language/function_template>), ou, se não for isso,

6) `F1` e `F2` são funções não-template e `F1` é [mais restrita por ordenação parcial](<#/doc/language/constraints>) que `F2`:
```cpp
    template<typename T = int>
    struct S
    {
        constexpr void f(); // #1
        constexpr void f(this S&) requires true; // #2
    };
    
    void test()
    {
        S<> s;
        s.f(); // calls #2
    }
```

, ou, se não for isso, | (desde C++20)
  
  

7) `F1` é um construtor para uma classe `D`, `F2` é um construtor para uma classe base `B` de `D`, e para todos os argumentos os parâmetros correspondentes de `F1` e `F2` têm o mesmo tipo:
```cpp
    struct A
    {
        A(int = 0);
    };
    
    struct B: A
    {
        using A::A;
    
        B();
    };
    
    B b; // OK, B::B()
```

, ou, se não for isso, | (desde C++11)
  
  

8) `F2` é um candidato reescrito e `F1` não é, ou, se não for isso, 9) `F1` e `F2` são ambos candidatos reescritos, e `F2` é um candidato reescrito sintetizado com ordem inversa de parâmetros e `F1` não é, ou, se não for isso, | (desde C++20)
  
  

10) `F1` é gerado a partir de um [guia de dedução definido pelo usuário](<#/doc/language/deduction_guide>) e `F2` não é, ou, se não for isso, 11) `F1` é o [candidato de dedução de cópia](<#/doc/language/deduction_guide>) e `F2` não é, ou, se não for isso, 12) `F1` é gerado a partir de um construtor não-template e `F2` é gerado a partir de um constructor template:
```cpp
    template<class T>
    struct A
    {
        using value_type = T;
        A(value_type);  // #1
        A(const A&);    // #2
        A(T, T, int);   // #3
    
        template<class U>
        A(int, T, U);   // #4
    };                  // #5 is A(A), the copy deduction candidate
    
    A x(1, 2, 3); // uses #3, generated from a non-template constructor
    
    template<class T>
    A(T) -> A<T>;       // #6, less specialized than #5
    
    A a (42); // uses #6 to deduce A<int> and #1 to initialize
    A b = a;  // uses #5 to deduce A<int> and #2 to initialize
    
    template<class T>
    A(A<T>) -> A<A<T>>; // #7, as specialized as #5
    A b2 = a; // uses #7 to deduce A<A<int>> and #1 to initialize
```

| (desde C++17)
  
Essas comparações par a par são aplicadas a todas as funções viáveis. Se exatamente uma função viável é melhor que todas as outras, a resolução de sobrecarga é bem-sucedida e esta função é chamada. Caso contrário, a compilação falha.
```cpp
    void Fcn(const int*, short); // overload #1
    void Fcn(int*, int);         // overload #2
    
    int i;
    short s = 0;
    
    void f() 
    {
        Fcn(&i, 1L);  // 1st argument: &i -> int* is better than &i -> const int*
                      // 2nd argument: 1L -> short and 1L -> int are equivalent
                      // calls Fcn(int*, int)
    
        Fcn(&i, 'c'); // 1st argument: &i -> int* is better than &i -> const int*
                      // 2nd argument: 'c' -> int is better than 'c' -> short
                      // calls Fcn(int*, int)
    
        Fcn(&i, s);   // 1st argument: &i -> int* is better than &i -> const int*
                      // 2nd argument: s -> short is better than s -> int
                      // no winner, compilation error
    }
```

Se a melhor função viável se resolve para uma função para a qual múltiplas declarações foram encontradas, e se quaisquer duas dessas declarações habitam escopos diferentes e especificam um argumento padrão que tornou a função viável, o programa é malformado.
```cpp
    namespace A
    {
        extern "C" void f(int = 5);
    }
    
    namespace B
    {
        extern "C" void f(int = 5);
    }
    
    using A::f;
    using B::f;
    
    void use()
    {
        f(3); // OK, default argument was not used for viability
        f();  // error: found default argument twice
    }
```

### Ranqueamento de sequências de conversão implícita

As sequências de conversão implícita argumento-parâmetro consideradas pela resolução de sobrecarga correspondem às [conversões implícitas](<#/doc/language/implicit_cast>) usadas na [inicialização por cópia](<#/doc/language/copy_initialization>) (para parâmetros não-referência), exceto que, ao considerar a conversão para o parâmetro de objeto implícito ou para o lado esquerdo do operador de atribuição, as conversões que criam objetos temporários não são consideradas. Quando o parâmetro é o parâmetro de objeto implícito de uma função membro estática, a sequência de conversão implícita é uma sequência de conversão padrão que não é nem melhor nem pior do que qualquer outra sequência de conversão padrão. (desde C++23)

Cada [tipo de sequência de conversão padrão](<#/doc/language/implicit_cast>) recebe um de três ranques:

1) **Correspondência exata** : nenhuma conversão necessária, conversão lvalue-para-rvalue, conversão de qualificação, conversão de ponteiro de função, (desde C++17) conversão definida pelo usuário de tipo de classe para a mesma classe
2) **Promoção** : promoção integral, promoção de ponto flutuante

3) **Conversão** : conversão integral, conversão de ponto flutuante, conversão de ponto flutuante-integral, conversão de ponteiro, conversão de ponteiro para membro, conversão booleana, conversão definida pelo usuário de uma classe derivada para sua base

A classificação da sequência de conversão padrão é a pior das classificações das conversões padrão que ela contém (pode haver até [três conversões](<#/doc/language/implicit_cast>))

A ligação de um parâmetro de referência diretamente à expressão do argumento é uma identidade ou uma conversão de derivada para base:
```cpp
    struct Base {};
    struct Derived : Base {} d;
    
    int f(Base&);    // overload #1
    int f(Derived&); // overload #2
    
    int i = f(d); // d -> Derived& tem classificação Correspondência Exata
                  // d -> Base& tem classificação Conversão
                  // chama f(Derived&)
```

Como a classificação das sequências de conversão opera apenas com tipos e categorias de valor, um [bit field](<#/doc/language/bit_field>) pode se ligar a um argumento de referência para fins de classificação, mas se essa função for selecionada, será malformada.

1) Uma sequência de conversão padrão é sempre _melhor_ do que uma sequência de conversão definida pelo usuário ou uma sequência de conversão de reticências.

2) Uma sequência de conversão definida pelo usuário é sempre _melhor_ do que uma sequência de [conversão de reticências](<#/doc/language/variadic_arguments>).

3) Uma sequência de conversão padrão `S1` é _melhor_ do que uma sequência de conversão padrão `S2` se

a) `S1` é uma subsequência própria de `S2`, excluindo transformações de lvalue; a sequência de conversão de identidade é considerada uma subsequência de qualquer conversão não-identidade, ou, se não for isso,

b) a classificação de `S1` é melhor do que a classificação de `S2`, ou, se não for isso,

c) ambas `S1` e `S2` estão se ligando a um parâmetro de referência para algo diferente do parâmetro de objeto implícito de uma função membro ref-qualificada, e `S1` liga uma rvalue reference a um rvalue enquanto `S2` liga uma lvalue reference a um rvalue:
```cpp
    int i;
    int f1();
    
    int g(const int&);  // overload #1
    int g(const int&&); // overload #2
    
    int j = g(i);    // lvalue int -> const int& é a única conversão válida
    int k = g(f1()); // rvalue int -> const int&& melhor que rvalue int -> const int&
```

ou, se não for isso,

d) ambas `S1` e `S2` estão se ligando a um parâmetro de referência e `S1` liga uma lvalue reference a uma função enquanto `S2` liga uma rvalue reference a uma função:
```cpp
    int f(void(&)());  // overload #1
    int f(void(&&)()); // overload #2
    
    void g();
    int i1 = f(g); // chama #1
```

ou, se não for isso,

e) `S1` e `S2` diferem apenas na conversão de qualificação, e a qualificação cv do resultado de `S1` é um subconjunto próprio da qualificação cv do resultado de `S2`, e `S1` não é a [conversão de array de literal de string para ponteiro depreciada](<#/doc/language/string_literal>)(até C++11). | (até C++20)
---|---
o resultado de `S1` pode ser convertido para o resultado de `S2` por uma conversão de qualificação. | (desde C++20)
```cpp
    int f(const int*);
    int f(int*);
    
    int i;
    int j = f(&i); // &i -> int* é melhor que &i -> const int*, chama f(int*)
```

ou, se não for isso,

f) ambas `S1` e `S2` estão se ligando a parâmetros de referência diferindo apenas na qualificação cv de nível superior, e o tipo de `S1` é _menos_ cv-qualificado que o de `S2`:
```cpp
    int f(const int &); // overload #1
    int f(int &);       // overload #2 (ambas referências)
    
    int g(const int &); // overload #1
    int g(int);         // overload #2
    
    int i;
    int j = f(i); // lvalue i -> int& é melhor que lvalue int -> const int&
                  // chama f(int&)
    int k = g(i); // lvalue i -> const int& tem classificação Correspondência Exata
                  // lvalue i -> rvalue int tem classificação Correspondência Exata
                  // sobrecarga ambígua: erro de compilação
```

ou, se não for isso,

g) `S1` e `S2` ligam o mesmo tipo de referência “referência a `T`” e têm tipos de origem `V1` e `V2`, respectivamente, onde a sequência de conversão padrão de `V1*` para `T*` é melhor do que a sequência de conversão padrão de `V2*` para `T*`:
```cpp
    struct Z {};
    
    struct A
    {
        operator Z&();
        operator const Z&();  // overload #1
    };
    
    struct B
    {
        operator Z();
        operator const Z&&(); // overload #2
    };
    
    const Z& r1 = A();        // OK, usa #1
    const Z&& r2 = B();       // OK, usa #2
```

4) Uma sequência de conversão definida pelo usuário `U1` é _melhor_ do que uma sequência de conversão definida pelo usuário `U2` se elas chamarem o mesmo construtor/função de conversão definida pelo usuário ou inicializarem a mesma classe com aggregate-initialization, e em ambos os casos a segunda sequência de conversão padrão em `U1` é melhor do que a segunda sequência de conversão padrão em `U2`
```cpp
    struct A
    {
        operator short(); // função de conversão definida pelo usuário
    } a;
    
    int f(int);   // overload #1
    int f(float); // overload #2
    
    int i = f(a); // A -> short, seguido por short -> int (classificação Promoção)
                  // A -> short, seguido por short -> float (classificação Conversão)
                  // chama f(int)
```

5) Uma sequência de list-initialization `L1` é _melhor_ do que uma sequência de list-initialization `L2` se `L1` inicializa um parâmetro [std::initializer_list](<#/doc/utility/initializer_list>), enquanto `L2` não.
```cpp
    void f1(int);                                 // #1
    void f1(std::initializer_list<long>);         // #2
    void g1() { f1({42}); }                       // escolhe #2
    
    void f2(std::pair<const char*, const char*>); // #3
    void f2(std::initializer_list<std::string>);  // #4
    void g2() { f2({"foo", "bar"}); }             // escolhe #4
```

6) Uma sequência de list-initialization `L1` é _melhor_ do que uma sequência de list-initialization `L2` se os parâmetros correspondentes são referências a arrays, e L1 converte para o tipo "array de N1 T", L2 converte para o tipo "array de N2 T", e N1 é menor que N2. | (desde C++11)
(até C++20)
6) Uma sequência de list-initialization `L1` é _melhor_ do que uma sequência de list-initialization `L2` se os parâmetros correspondentes são referências a arrays, e L1 e L2 convertem para arrays do mesmo tipo de elemento, e ou

  * o número de elementos N1 inicializados por L1 é menor do que o número de elementos N2 inicializados por L2, ou
  * N1 é igual a N2 e L2 converte para um array de limite desconhecido e L1 não.

```cpp
    void f(int    (&&)[] ); // overload #1
    void f(double (&&)[] ); // overload #2
    void f(int    (&&)[2]); // overload #3
    
    f({1});        // #1: Melhor que #2 devido à conversão, melhor que #3 devido aos limites
    f({1.0});      // #2: double -> double é melhor que double -> int
    f({1.0, 2.0}); // #2: double -> double é melhor que double -> int
    f({1, 2});     // #3: -> int[2] é melhor que -> int[], 
                   //     e int -> int é melhor que int -> double
```

| (desde C++20)

Se duas sequências de conversão são indistinguíveis porque têm a mesma classificação, as seguintes regras adicionais se aplicam:

1) A conversão que não envolve ponteiro para bool ou ponteiro para membro para bool é melhor do que a que envolve.

2) A conversão que promove uma [enumeração](<#/doc/language/enum>) cujo tipo subjacente é fixo para seu tipo subjacente é melhor do que uma que promove para o tipo subjacente promovido, se os dois tipos forem diferentes.
```cpp
    enum num : char { one = '0' };
    std::cout << num::one; // '0', não 48
```

| (desde C++11)

3) Uma conversão em qualquer direção entre o tipo de ponto flutuante `FP1` e o tipo de ponto flutuante `FP2` é melhor do que uma conversão na mesma direção entre `FP1` e o tipo aritmético `T3` se

  * a [classificação de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) de `FP1` é igual à classificação de `FP2`, e
    * `T3` não é um tipo de ponto flutuante, ou
    * `T3` é um tipo de ponto flutuante cuja classificação não é igual à classificação de `FP1`, ou
    * a [subclassificação de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) de `FP2` é maior do que a subclassificação de `T3`.

```cpp
    int f(std::float32_t);
    int f(std::float64_t);
    int f(long long);
    
    float x;
    std::float16_t y;
    
    int i = f(x); // chama f(std::float32_t) em implementações onde
                  // float e std::float32_t têm classificações de conversão iguais
    int j = f(y); // erro: ambíguo, sem classificação de conversão igual
```

| (desde C++23)

4) A conversão que converte ponteiro para derivado para ponteiro para base é melhor do que a conversão de ponteiro para derivado para ponteiro para void, e a conversão de ponteiro para base para void é melhor do que ponteiro para derivado para void.

5) Se `Mid` é derivado (direta ou indiretamente) de `Base`, e `Derived` é derivado (direta ou indiretamente) de `Mid`

a) `Derived*` para `Mid*` é melhor que `Derived*` para `Base*`

b) `Derived` para `Mid&` ou `Mid&&` é melhor que `Derived` para `Base&` ou `Base&&`

c) `Base::*` para `Mid::*` é melhor que `Base::*` para `Derived::*`

d) `Derived` para `Mid` é melhor que `Derived` para `Base`

e) `Mid*` para `Base*` é melhor que `Derived*` para `Base*`

f) `Mid` para `Base&` ou `Base&&` é melhor que `Derived` para `Base&` ou `Base&&`

g) `Mid::*` para `Derived::*` é melhor que `Base::*` para `Derived::*`

h) `Mid` para `Base` é melhor que `Derived` para `Base`

Sequências de conversão ambíguas são classificadas como sequências de conversão definidas pelo usuário porque múltiplas sequências de conversão para um argumento podem existir apenas se envolverem diferentes conversões definidas pelo usuário:
```cpp
    class B;
    
    class A { A (B&);};         // construtor de conversão
    class B { operator A (); }; // função de conversão definida pelo usuário
    class C { C (B&); };        // construtor de conversão
    
    void f(A) {} // overload #1
    void f(C) {} // overload #2
    
    B b;
    f(b); // B -> A via ctor ou B -> A via função (conversão ambígua)
          // b -> C via ctor (conversão definida pelo usuário)
          // as conversões para a sobrecarga #1 e para a sobrecarga #2
          // são indistinguíveis; a compilação falha
```

### Sequência de conversão implícita em list-initialization

Em [list initialization](<#/doc/language/list_initialization>), o argumento é uma braced-init-list, que não é uma expressão, portanto, a sequência de conversão implícita para o tipo do parâmetro para fins de resolução de sobrecarga é decidida pelas seguintes regras especiais:

  * Se o tipo do parâmetro é um aggregate `X` e a lista de inicializadores consiste em exatamente um elemento da mesma classe ou de uma classe derivada (possivelmente cv-qualificada), a sequência de conversão implícita é a necessária para converter o elemento para o tipo do parâmetro.
  * Caso contrário, se o tipo do parâmetro é uma referência a um array de caracteres e a lista de inicializadores tem um único elemento que é um literal de string de tipo apropriado, a sequência de conversão implícita é a conversão de identidade.
  * Caso contrário, se o tipo do parâmetro é [std::initializer_list](<#/doc/utility/initializer_list>)&lt;X&gt;, e há uma conversão implícita não-restritiva de cada elemento da lista de inicializadores para `X`, a sequência de conversão implícita para fins de resolução de sobrecarga é a pior conversão necessária. Se a braced-init-list estiver vazia, a sequência de conversão é a conversão de identidade.

```cpp
    struct A
    {
        A(std::initializer_list<double>);          // #1
        A(std::initializer_list<complex<double>>); // #2
        A(std::initializer_list<std::string>);     // #3
    };
    A a{1.0, 2.0};     // seleciona #1 (rvalue double -> double: conversão de identidade)
    
    void g(A);
    g({"foo", "bar"}); // seleciona #3 (lvalue const char[4] -> std::string: conversão definida pelo usuário)
```

  * Caso contrário, se o tipo do parâmetro é "array de N T" (isso só acontece para referências a arrays), a lista de inicializadores deve ter N ou menos elementos, e a pior conversão implícita necessária para converter cada elemento da lista (ou o par de chaves vazio `{}` se a lista for menor que N) para `T` é a utilizada.

  * Caso contrário, se o tipo do parâmetro é "array de limite desconhecido de T" (isso só acontece para referências a arrays), a pior conversão implícita necessária para converter cada elemento da lista para `T` é a utilizada.

| (desde C++20)
```cpp
    typedef int IA[3];
    
    void h(const IA&);
    void g(int (&&)[]);
    
    h({1, 2, 3}); // conversão de identidade int->int
    g({1, 2, 3}); // o mesmo que acima desde C++20
```

  * Caso contrário, se o tipo do parâmetro é um tipo de classe não-aggregate `X`, a resolução de sobrecarga escolhe o construtor C de X para inicializar a partir da lista de inicializadores do argumento

    

  * Se C não é um construtor de initializer-list e a lista de inicializadores tem um único elemento de X possivelmente cv-qualificado, a sequência de conversão implícita tem classificação Correspondência Exata. Se a lista de inicializadores tem um único elemento de tipo possivelmente cv-qualificado derivado de X, a sequência de conversão implícita tem classificação Conversão. (observe a diferença dos aggregates: aggregates inicializam diretamente de listas de inicialização de elemento único antes de considerar [aggregate initialization](<#/doc/language/aggregate_initialization>), não-aggregates consideram construtores de initializer_list antes de quaisquer outros construtores)
  * caso contrário, a sequência de conversão implícita é uma sequência de conversão definida pelo usuário com a segunda sequência de conversão padrão sendo uma conversão de identidade.

Se múltiplos construtores são viáveis, mas nenhum é melhor que os outros, a sequência de conversão implícita é a sequência de conversão ambígua.
```cpp
    struct A { A(std::initializer_list<int>); };
    void f(A);
    
    struct B { B(int, double); };
    void g(B);
    
    g({'a', 'b'});    // chama g(B(int, double)), conversão definida pelo usuário
    // g({1.0, 1,0}); // erro: double->int é restritivo, não permitido em list-init
    
    void f(B);
    // f({'a', 'b'}); // f(A) e f(B) ambas conversões definidas pelo usuário
```

  * Caso contrário, se o tipo do parâmetro é um aggregate que pode ser inicializado a partir da lista de inicializadores de acordo com [aggregate initialization](<#/doc/language/aggregate_initialization>), a sequência de conversão implícita é uma sequência de conversão definida pelo usuário com a segunda sequência de conversão padrão sendo uma conversão de identidade.

```cpp
    struct A { int m1; double m2; };
    
    void f(A);
    f({'a', 'b'}); // chama f(A(int, double)), conversão definida pelo usuário
```

  * Caso contrário, se o parâmetro é uma referência, as regras de inicialização de referência se aplicam

```cpp
    struct A { int m1; double m2; };
    
    void f(const A&);
    f({'a', 'b'}); // temporário criado, f(A(int, double)) chamado. Conversão definida pelo usuário
```

  * Caso contrário, se o tipo do parâmetro não é uma classe e a lista de inicializadores tem um elemento, a sequência de conversão implícita é a necessária para converter o elemento para o tipo do parâmetro
  * Caso contrário, se o tipo do parâmetro não é um tipo de classe e se a lista de inicializadores não tem elementos, a sequência de conversão implícita é a conversão de identidade.

Se o argumento é uma designated initializer list e o parâmetro não é uma referência, uma conversão só é possível se o parâmetro tiver um tipo aggregate que possa ser inicializado a partir dessa lista de inicializadores de acordo com as regras para [aggregate initialization](<#/doc/language/aggregate_initialization>), nesse caso, a sequência de conversão implícita é uma sequência de conversão definida pelo usuário cuja segunda sequência de conversão padrão é uma conversão de identidade. Se, após a resolução de sobrecarga, a ordem de declaração dos membros do aggregate não corresponder para a sobrecarga selecionada, a inicialização do parâmetro será malformada.
```cpp
    struct A { int x, y; };
    struct B { int y, x; };
    
    void f(A a, int); // #1
    void f(B b, ...); // #2
    void g(A a);      // #3
    void g(B b);      // #4
    
    void h() 
    {
        f({.x = 1, .y = 2}, 0); // OK; chama #1
        f({.y = 2, .x = 1}, 0); // erro: seleciona #1, a inicialização de 'a' falha
                                // devido à ordem dos membros não correspondente
        g({.x = 1, .y = 2});    // erro: ambíguo entre #3 e #4
    }
```

| (desde C++20)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente aos padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 1](<https://cplusplus.github.io/CWG/issues/1.html>) | C++98 | o comportamento era não especificado quando a mesma função com argumentos padrão possivelmente diferentes (de escopos diferentes) é selecionada | o programa é malformado neste caso
[CWG 83](<https://cplusplus.github.io/CWG/issues/83.html>) | C++98 | a sequência de conversão de um literal de string para char* era melhor do que para const char* mesmo que a primeira seja depreciada | a classificação da conversão depreciada é rebaixada (foi removida em C++11)
[CWG 162](<https://cplusplus.github.io/CWG/issues/162.html>) | C++98 | era inválido se o conjunto de sobrecargas nomeado por `F` contivesse uma função membro não estática no caso de `&F(args)` | inválido apenas se a resolução de sobrecarga selecionar uma função membro não estática neste caso
[CWG 233](<https://cplusplus.github.io/CWG/issues/233.html>) | C++98 | referências e ponteiros eram tratados de forma inconsistente na resolução de sobrecarga com conversões definidas pelo usuário | eles são tratados de forma consistente
[CWG 280](<https://cplusplus.github.io/CWG/issues/280.html>) | C++98 | funções de chamada substitutas não eram adicionadas ao conjunto de funções candidatas para funções de conversão declaradas em classes base inacessíveis | removida a restrição de acessibilidade, o programa é malformado se uma função de chamada substituta for selecionada e a função de conversão correspondente não puder ser chamada
[CWG 415](<https://cplusplus.github.io/CWG/issues/415.html>) | C++98 | quando um template de função é selecionado como candidato, suas especializações eram instanciadas usando dedução de argumento de template | nenhuma instanciação ocorrerá neste caso, suas declarações serão sintetizadas
[CWG 495](<https://cplusplus.github.io/CWG/issues/495.html>) | C++98 | quando as conversões implícitas para argumentos eram igualmente boas, uma função de conversão não-template era sempre melhor do que um template de função de conversão, mesmo que este último pudesse ter uma sequência de conversão padrão melhor | sequências de conversão padrão são comparadas antes dos níveis de especialização
[CWG 1307](<https://cplusplus.github.io/CWG/issues/1307.html>) | C++11 | a resolução de sobrecarga baseada no tamanho de arrays não era especificada | um array mais curto é melhor quando possível
[CWG 1328](<https://cplusplus.github.io/CWG/issues/1328.html>) | C++11 | a determinação das funções candidatas ao ligar uma referência a um resultado de conversão não era clara | tornada clara
[CWG 1374](<https://cplusplus.github.io/CWG/issues/1374.html>) | C++98 | a conversão de qualificação era verificada antes da ligação de referência ao comparar sequências de conversão padrão | invertido
[CWG 1385](<https://cplusplus.github.io/CWG/issues/1385.html>) | C++11 | uma função de conversão definida pelo usuário não-explícita declarada com um ref-qualifier não tinha uma função substituta correspondente | ela tem uma função substituta correspondente
[CWG 1467](<https://cplusplus.github.io/CWG/issues/1467.html>) | C++11 | list-initialization de mesmo tipo de aggregates e arrays foi omitida | inicialização definida
[CWG 1601](<https://cplusplus.github.io/CWG/issues/1601.html>) | C++11 | a conversão de enum para seu tipo subjacente não preferia o tipo subjacente fixo | o tipo fixo é preferido ao que ele promove
[CWG 1608](<https://cplusplus.github.io/CWG/issues/1608.html>) | C++98 | o conjunto de membros candidatos de um operador unário `@` cujo argumento tem tipo `T1` era vazio se `T1` é uma classe sendo definida atualmente | o conjunto é o resultado da pesquisa de nome qualificado de `T1::operator@` neste caso
[CWG 1687](<https://cplusplus.github.io/CWG/issues/1687.html>) | C++11 | quando um candidato built-in é selecionado pela resolução de sobrecarga, os operandos passariam por conversão sem restrição | apenas converte operandos de tipo de classe, e desabilitou a segunda sequência de conversão padrão
[CWG 2052](<https://cplusplus.github.io/CWG/issues/2052.html>) | C++98 | especializações de template de função sintetizadas malformadas poderiam ser adicionadas ao conjunto de candidatos, tornando o programa malformado | elas não são adicionadas ao conjunto de candidatos
[CWG 2076](<https://cplusplus.github.io/CWG/issues/2076.html>) | C++11 | a conversão definida pelo usuário é aplicada ao único inicializador em uma lista de inicializadores aninhada durante a list-initialization devido à resolução do [problema CWG 1467](<https://cplusplus.github.io/CWG/issues/1467.html>) | não aplicada
[CWG 2137](<https://cplusplus.github.io/CWG/issues/2137.html>) | C++11 | construtores de initializer list perdiam para construtores de cópia ao list-inicializar `X` de {X} | não-aggregates consideram initializer lists primeiro
[CWG 2273](<https://cplusplus.github.io/CWG/issues/2273.html>) | C++11 | não havia desempate entre construtores herdados e não herdados | construtor não herdado vence
[CWG 2673](<https://cplusplus.github.io/CWG/issues/2673.html>) | C++20 | candidatos built-in com a mesma lista de parâmetros que um candidato não-membro reescrito eram adicionados à lista de candidatos built-in | não adicionados
[CWG 2712](<https://cplusplus.github.io/CWG/issues/2712.html>) | C++98 | quando um operador de atribuição built-in é considerado, o primeiro parâmetro não podia ser ligado a um temporário, o que já é impossível[1](<#/doc/language/overload_resolution>) | removido o requisito redundante
[CWG 2713](<https://cplusplus.github.io/CWG/issues/2713.html>) | C++20 | a restrição de conversão referente a designated initializer lists era aplicada mesmo se o parâmetro fosse uma referência | não restrito neste caso
[CWG 2789](<https://cplusplus.github.io/CWG/issues/2789.html>) | C++23 | o parâmetro de objeto explícito era incluído ao comparar parameter-type-lists | excluído
[CWG 2856](<https://cplusplus.github.io/CWG/issues/2856.html>) | C++11 | a resolução de sobrecarga para default-initialization no contexto de copy-list-initialization considerava apenas o construtor de conversão | considera todos os construtores
[CWG 2919](<https://cplusplus.github.io/CWG/issues/2919.html>) | C++98 | o conjunto de candidatos de inicialização de referência por conversão dependia do tipo de destino da inicialização | depende do tipo de destino da conversão
[P2468R2](<https://wg21.link/P2468R2>) | C++20 | candidatos reescritos baseados em operator== são adicionados para a != b mesmo que um operator!= correspondente exista | não adicionados

  1. [↑](<#/doc/language/overload_resolution>) O tipo do primeiro parâmetro de um operador de atribuição built-in é “lvalue reference para `T` possivelmente volatile-qualificado”. Referências deste tipo não podem ser ligadas a um temporário.

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 12.2 Resolução de sobrecarga [over.match]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 12.4 Resolução de sobrecarga [over.match]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 16.3 Resolução de sobrecarga [over.match]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 13.3 Resolução de sobrecarga [over.match]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 13.3 Resolução de sobrecarga [over.match]

  * Padrão C++03 (ISO/IEC 14882:2003):

    

  * 13.3 Resolução de sobrecarga [over.match]

### Ver também

  * [Pesquisa de nome](<#/doc/language/lookup>)
  * [Pesquisa dependente de argumento](<#/doc/language/adl>)
  * [Dedução de argumento de template](<#/doc/language/template_argument_deduction>)
  * [SFINAE](<#/doc/language/sfinae>)
