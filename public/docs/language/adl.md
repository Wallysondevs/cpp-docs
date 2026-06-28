# Pesquisa dependente de argumento

A pesquisa dependente de argumento (ADL), também conhecida como pesquisa de Koenig[1](<#/doc/language/adl>), é o conjunto de regras para pesquisar nomes de função não qualificados em [expressões de chamada de função](<#/doc/language/operator_other>), incluindo chamadas de função implícitas para [operadores sobrecarregados](<#/doc/language/operators>). Esses nomes de função são pesquisados nos namespaces de seus argumentos, além dos escopos e namespaces considerados pela [pesquisa de nome não qualificado](<#/doc/language/lookup>) usual.

A pesquisa dependente de argumento possibilita o uso de operadores definidos em um namespace diferente. Exemplo:

Run this code
```cpp
    #include <iostream>
    
    int main()
    {
        std::cout << "Test\n"; // Não há operator<< no namespace global, mas o ADL
                               // examina o namespace std porque o argumento esquerdo está em
                               // std e encontra std::operator<<(std::ostream&, const char*)
        operator<<(std::cout, "Test\n"); // O mesmo, usando notação de chamada de função
    
        // No entanto,
        std::cout << endl; // Erro: “endl” não está declarado neste namespace.
                           // Esta não é uma chamada de função para endl(), então o ADL não se aplica
    
        endl(std::cout); // OK: esta é uma chamada de função: o ADL examina o namespace std
                         // porque o argumento de endl está em std, e encontra std::endl
    
        (endl)(std::cout); // Erro: “endl” não está declarado neste namespace.
                           // A subexpressão (endl) não é um unqualified-id
    }
```

### Detalhes

Primeiro, a pesquisa dependente de argumento não é considerada se o conjunto de pesquisa produzido pela [pesquisa não qualificada](<#/doc/language/lookup>) usual contiver qualquer um dos seguintes:

1) uma declaração de um membro de classe.

2) uma declaração de uma função em escopo de bloco (que não seja uma [declaração using](<#/doc/language/namespace>)).

3) qualquer declaração que não seja uma função ou um function template (por exemplo, um objeto de função ou outra variável cujo nome conflita com o nome da função que está sendo pesquisada).

Caso contrário, para cada argumento em uma expressão de chamada de função, seu tipo é examinado para determinar o _conjunto associado de namespaces e classes_ que ele adicionará à pesquisa.

1) Para argumentos de tipo fundamental, o conjunto associado de namespaces e classes é vazio.

2) Para argumentos de tipo de classe (incluindo union), o conjunto consiste em:

a) A própria classe.

b) Se a classe for [completa](<#/doc/language/type-id>), todas as suas classes base diretas e indiretas.

c) Se a classe for um [membro de outra classe](<#/doc/language/nested_classes>), a classe da qual ela é um membro.

d) Os namespaces delimitadores mais internos das classes adicionadas ao conjunto.

3) Para argumentos cujo tipo é uma especialização de [class template](<#/doc/language/class_template>), além das regras de classe, as seguintes classes e namespaces associados são adicionados ao conjunto.

a) Os tipos de todos os argumentos template fornecidos para parâmetros template de tipo (ignorando parâmetros template não-tipo e ignorando parâmetros template template).

b) Os namespaces nos quais quaisquer argumentos template template são membros.

c) As classes nas quais quaisquer argumentos template template são membros (se forem class member templates).

4) Para argumentos de tipo de enumeração, o namespace delimitador mais interno da declaração do tipo de enumeração é adicionado ao conjunto. Se o tipo de enumeração for um membro de uma classe, essa classe é adicionada ao conjunto.

5) Para argumentos do tipo ponteiro para `T` ou ponteiro para um array de `T`, o tipo `T` é examinado e seu conjunto associado de classes e namespaces é adicionado ao conjunto.

6) Para argumentos de tipo de função, os tipos de parâmetro da função e o tipo de retorno da função são examinados e seu conjunto associado de classes e namespaces é adicionado ao conjunto.

7) Para argumentos do tipo ponteiro para função membro `F` da classe `X`, os tipos de parâmetro da função, o tipo de retorno da função e a classe `X` são examinados e seu conjunto associado de classes e namespaces é adicionado ao conjunto.

8) Para argumentos do tipo ponteiro para membro de dados `T` da classe `X`, o tipo do membro e o tipo `X` são ambos examinados e seu conjunto associado de classes e namespaces é adicionado ao conjunto.

9) Se o argumento for o nome ou a [expressão address-of para um conjunto de funções sobrecarregadas](<#/doc/language/overloaded_address>) (ou function templates), cada função no conjunto de sobrecargas é examinada e seu conjunto associado de classes e namespaces é adicionado ao conjunto.

  * Adicionalmente, se o conjunto de sobrecargas for nomeado por um [template identifier](<#/doc/language/templates>), todos os seus argumentos template de tipo e argumentos template template (mas não argumentos template não-tipo) são examinados e seu conjunto associado de classes e namespaces é adicionado ao conjunto.

Se qualquer namespace no conjunto associado de classes e namespaces for um [inline namespace](<#/doc/language/namespace>), seu namespace delimitador também é adicionado ao conjunto. Se qualquer namespace no conjunto associado de classes e namespaces contiver diretamente um inline namespace, esse inline namespace é adicionado ao conjunto. | (desde C++11)

Após o conjunto associado de classes e namespaces ser determinado, todas as declarações encontradas em classes deste conjunto são descartadas para fins de processamento ADL adicional, exceto funções friend com escopo de namespace e function templates, conforme declarado no ponto 2 abaixo.

O conjunto de declarações encontrado pela [pesquisa não qualificada](<#/doc/language/lookup>) ordinária e o conjunto de declarações encontrado em todos os elementos do conjunto associado produzido pelo ADL, são mesclados, com as seguintes regras especiais:

1) [using directives](<#/doc/language/namespace>) nos namespaces associados são ignoradas.

2) funções friend com escopo de namespace (e function templates) que são declaradas em uma classe associada são visíveis através do ADL mesmo que não sejam visíveis através da pesquisa ordinária.

3) todos os nomes, exceto as funções e function templates, são ignorados (sem colisão com variáveis).

### Notas

Devido à pesquisa dependente de argumento, funções não-membro e operadores não-membro definidos no mesmo namespace que uma classe são considerados parte da interface pública dessa classe (se forem encontrados através do ADL) [2](<#/doc/language/adl>).

O ADL é a razão por trás do idioma estabelecido para trocar dois objetos em código genérico: `using [std::swap]; swap(obj1, obj2);` porque chamar `[std::swap](obj1, obj2)` diretamente não consideraria as funções `swap()` definidas pelo usuário que poderiam ser definidas no mesmo namespace que os tipos de obj1 ou obj2, e apenas chamar o `swap(obj1, obj2)` não qualificado não chamaria nada se nenhuma sobrecarga definida pelo usuário fosse fornecida. Em particular, [std::iter_swap](<#/doc/algorithm/iter_swap>) e todos os outros algoritmos da standard library usam essa abordagem ao lidar com tipos [Swappable](<#/doc/named_req/Swappable>).

As regras de pesquisa de nome tornam impraticável declarar operadores em namespaces globais ou definidos pelo usuário que operam em tipos do namespace `std`, por exemplo, um `operator>>` ou `operator+` personalizado para [std::vector](<#/doc/container/vector>) ou para [std::pair](<#/doc/utility/pair>) (a menos que os tipos de elemento do vector/pair sejam tipos definidos pelo usuário, o que adicionaria seu namespace ao ADL). Tais operadores não seriam pesquisados a partir de instanciações de template, como os algoritmos da standard library. Consulte [dependent names](<#/doc/language/dependent_name>) para mais detalhes.

O ADL pode encontrar uma [friend function](<#/doc/language/friend>) (tipicamente, um operador sobrecarregado) que é definida inteiramente dentro de uma classe ou class template, mesmo que nunca tenha sido declarada no nível do namespace.
```cpp
    template<typename T>
    struct number
    {
        number(int);
        friend number gcd(number x, number y) { return 0; }; // Definição dentro
                                                             // de um class template
    };
    
    // A menos que uma declaração correspondente seja fornecida, gcd é
    // um membro invisível (exceto através do ADL) deste namespace
    void g()
    {
        number<double> a(3), b(4);
        a = gcd(a, b); // Encontra gcd porque number<double> é uma classe associada,
                       // tornando gcd visível em seu namespace (escopo global)
    //  b = gcd(3, 4); // Erro; gcd não está visível
    }
```

Embora uma chamada de função possa ser resolvida através do ADL mesmo que a pesquisa ordinária não encontre nada, uma chamada de função para um [function template](<#/doc/language/function_template>) com argumentos template explicitamente especificados requer que haja uma declaração do template encontrada pela pesquisa ordinária (caso contrário, é um erro de sintaxe encontrar um nome desconhecido seguido por um caractere de 'menor que').
```cpp
    namespace N1
    {
        struct S {};
    
        template<int X>
        void f(S);
    }
    
    namespace N2
    template<class T>
        void f(T t);
    }
    
    void g(N1::S s)
    {
        f<3>(s);     // Erro de sintaxe até C++20 (pesquisa não qualificada não encontra f)
        N1::f<3>(s); // OK, pesquisa qualificada encontra o template 'f'
        N2::f<3>(s); // Erro: N2::f não aceita um parâmetro não-tipo
                     //        N1::f não é pesquisado porque o ADL só funciona
                     //              com nomes não qualificados
    
        using N2::f;
        f<3>(s); // OK: Pesquisa não qualificada agora encontra N2::f
                 //     então o ADL entra em ação porque este nome é não qualificado
                 //     e encontra N1::f
    }
```

| (até C++20)

Nos seguintes contextos, ocorre apenas a pesquisa ADL (ou seja, pesquisa apenas em namespaces associados):

  * a pesquisa das funções não-membro `begin` e `end` realizada pelo loop [range-for](<#/doc/language/range-for>) se a pesquisa de membro falhar.

| (desde C++11)

  * a [pesquisa de nome dependente](<#/doc/language/dependent_name>) a partir do ponto de instanciação do template.

  * a pesquisa da função não-membro `get` realizada pela [declaração de structured binding](<#/doc/language/structured_binding>) para tipos semelhantes a tuplas.

| (desde C++17)

### Exemplos

| Esta seção está incompleta
Razão: mais exemplos

Exemplo de <http://www.gotw.ca/gotw/030.htm>

Run this code
```cpp
    namespace A
    {
        struct X;
        struct Y;
    
        void f(int);
        void g(X);
    }
    
    namespace B
    {
        void f(int i)
        {
            f(i); // Chama B::f (recursão infinita)
        }
    
        void g(A::X x)
        {
            g(x); // Erro: ambíguo entre B::g (pesquisa ordinária)
                  //        e A::g (pesquisa dependente de argumento)
        }
    
        void h(A::Y y)
        {
            h(y); // Chama B::h (recursão infinita): o ADL examina o namespace A
                  // mas não encontra A::h, então apenas B::h da pesquisa ordinária é usado
        }
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[CWG 33](<https://cplusplus.github.io/CWG/issues/33.html>) | C++98 | os namespaces ou classes associados são não especificados se um argumento usado para pesquisa for o endereço de um grupo de funções sobrecarregadas ou um function template | especificado
[CWG 90](<https://cplusplus.github.io/CWG/issues/90.html>) | C++98 | as classes associadas de uma classe aninhada não-union não incluíam sua classe delimitadora, mas uma union aninhada era associada à sua classe delimitadora | não-unions também associadas
[CWG 239](<https://cplusplus.github.io/CWG/issues/239.html>) | C++98 | uma declaração de função com escopo de bloco encontrada na pesquisa não qualificada ordinária não impedia o ADL de ocorrer | ADL não considerado exceto para declarações using
[CWG 997](<https://cplusplus.github.io/CWG/issues/997.html>) | C++98 | tipos de parâmetro dependentes e tipos de retorno eram excluídos da consideração ao determinar as classes e namespaces associados de um function template | incluído
[CWG 1690](<https://cplusplus.github.io/CWG/issues/1690.html>) | C++98<br>C++11 | ADL não conseguia encontrar lambdas (C++11) ou objetos de tipos de classe locais (C++98) que são retornados | eles podem ser encontrados
[CWG 1691](<https://cplusplus.github.io/CWG/issues/1691.html>) | C++11 | ADL tinha comportamentos surpreendentes para declarações de enumeração opacas | corrigido
[CWG 1692](<https://cplusplus.github.io/CWG/issues/1692.html>) | C++98 | classes duplamente aninhadas não tinham namespaces associados (suas classes delimitadoras não são membros de nenhum namespace) | namespaces associados são estendidos aos namespaces delimitadores mais internos
[CWG 2857](<https://cplusplus.github.io/CWG/issues/2857.html>) | C++98 | as classes associadas de um tipo de classe incompleto incluíam suas classes base | não incluído

### Ver também

  * [Pesquisa de nome](<#/doc/language/lookup>)
  * [Dedução de argumento template](<#/doc/language/function_template>)
  * [Resolução de sobrecarga](<#/doc/language/overload_resolution>)

### Links externos

  1. [↑](<#/doc/language/adl>) Andrew Koenig: ["A Personal Note About Argument-Dependent Lookup"](<https://www.drdobbs.com/cpp/a-personal-note-about-argument-dependent/232901443>)
  2. [↑](<#/doc/language/adl>) H. Sutter (1998) ["What's In a Class? - The Interface Principle"](<http://www.gotw.ca/publications/mill02.htm>) in C++ Report, 10(3)

---