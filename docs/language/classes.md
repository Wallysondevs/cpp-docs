# Classes

Uma classe é um tipo definido pelo usuário.

Um tipo de classe é definido por um class-specifier, que aparece na decl-specifier-seq da sintaxe de [declaração](<#/doc/language/declarations>). Veja [declaração de classe](<#/doc/language/class>) para a sintaxe do class specifier.

Uma classe pode ter os seguintes tipos de membros:

1) membros de dados:

a) [membros de dados não estáticos](<#/doc/language/data_members>), incluindo [bit-fields](<#/doc/language/bit_field>).

b) [membros de dados estáticos](<#/doc/language/static>)

2) funções membro:

a) [funções membro não estáticas](<#/doc/language/member_functions>)

b) [funções membro estáticas](<#/doc/language/static>)

3) tipos aninhados:

a) [classes aninhadas](<#/doc/language/nested_classes>) e [enumerações](<#/doc/language/enum>) definidas dentro da definição da classe

b) aliases de tipos existentes, definidos com [`typedef`](<#/doc/language/typedef>) ou [type alias](<#/doc/language/type_alias>) (desde C++11) declarações

c) o nome da classe dentro de sua própria definição atua como um alias de tipo membro público de si mesma para fins de [lookup](<#/doc/language/unqualified_lookup>) (exceto quando usado para nomear um [construtor](<#/doc/language/initializer_list>)): isso é conhecido como _[injected-class-name](<#/doc/language/injected-class-name>)_

4) [enumeradores](<#/doc/language/enum>) de todas as enumerações não escopadas definidas dentro da classe, ou introduzidos por [using-declarations](<#/doc/language/using_declaration>) ou [using-enum-declarations](<#/doc/language/enum>) (desde C++20)

5) [member templates](<#/doc/language/member_template>) (variable templates, (desde C++14) class templates ou function templates) podem aparecer no corpo de qualquer class/struct/union não local.

Todos os membros são definidos de uma vez na definição da classe, eles não podem ser adicionados a uma classe já definida (ao contrário dos membros de namespaces)

Um membro de uma classe `T` não pode usar `T` como seu nome se o membro for

*   um membro de dados estático,
*   uma função membro,
*   um tipo membro,
*   um member template,
*   um enumerador de uma enumeração (a menos que a enumeração seja escopada) (desde C++11), ou
*   um membro de uma union anônima membro.

No entanto, um membro de dados não estático pode usar o nome `T` desde que não haja construtores declarados pelo usuário.

Uma classe com pelo menos uma função membro [virtual](<#/doc/language/virtual>) declarada ou herdada é _polimórfica_. Objetos desse tipo são [objetos polimórficos](<#/doc/language/objects>) e possuem informações de tipo em tempo de execução armazenadas como parte da representação do objeto, que podem ser consultadas com [`dynamic_cast`](<#/doc/language/dynamic_cast>) e [`typeid`](<#/doc/language/typeid>). Funções membro virtuais participam do binding dinâmico.

Uma classe com pelo menos uma função membro virtual pura declarada ou herdada é uma [classe abstrata](<#/doc/language/abstract_class>). Objetos desse tipo não podem ser criados.

```cpp
Uma classe com um construtor constexpr é um LiteralType: objetos desse tipo podem ser manipulados por funções constexpr em tempo de compilação.  // (desde C++11)
```

### Propriedades das classes

#### Classe trivially copyable

Uma _classe trivially copyable_ é uma classe que

*   tem pelo menos um [construtor de cópia](<#/doc/language/copy_constructor>) elegível, [construtor de movimento](<#/doc/language/move_constructor>), [operador de atribuição de cópia](<#/doc/language/as_operator>), ou [operador de atribuição de movimento](<#/doc/language/move_operator>),
*   cada construtor de cópia elegível é [trivial](<#/doc/language/copy_constructor>)
*   cada construtor de movimento elegível é [trivial](<#/doc/language/move_constructor>)
*   cada operador de atribuição de cópia elegível é [trivial](<#/doc/language/as_operator>)
*   cada operador de atribuição de movimento elegível é [trivial](<#/doc/language/move_operator>), e
*   tem um [destrutor trivial](<#/doc/language/destructor>) não deletado.

|

#### Classe trivial

Uma _classe trivial_ é uma classe que

*   é trivially copyable, e
*   tem um ou mais [construtores padrão elegíveis](<#/doc/language/default_constructor>) de modo que cada um seja [trivial](<#/doc/language/default_constructor>).

| (depreciado em C++26)

#### Classe standard-layout

Uma _classe standard-layout_ é uma classe que

*   não tem [membros de dados não estáticos](<#/doc/language/data_members>) do tipo classe non-standard-layout (ou array de tais tipos) ou referência,
*   não tem [funções virtuais](<#/doc/language/virtual>) e nenhuma [classe base virtual](<#/doc/language/derived_class>),
*   tem o mesmo [controle de acesso](<#/doc/language/access>) para todos os membros de dados não estáticos,
*   não tem classes base non-standard-layout,
*   apenas uma classe na hierarquia tem membros de dados não estáticos, e
*   Informalmente, nenhuma das classes base tem o mesmo tipo que o primeiro membro de dados não estático. Ou, formalmente: dada a classe como S, não tem nenhum elemento do conjunto M(S) de tipos como uma classe base, onde M(X) para um tipo X é definido como:

*   Se X é um tipo de classe não-union sem membros de dados não estáticos (possivelmente herdados), o conjunto M(X) é vazio.
*   Se X é um tipo de classe não-union cujo primeiro membro de dados não estático tem o tipo X0 (onde tal membro pode ser uma union anônima), o conjunto M(X) consiste em X0 e nos elementos de M(X0).
*   Se X é um tipo union, o conjunto M(X) é a união de todos os M(Ui) e o conjunto contendo todos os Ui, onde cada Ui é o tipo do i-ésimo membro de dados não estático de X.
*   Se X é um tipo array com tipo de elemento Xe, o conjunto M(X) consiste em Xe e nos elementos de M(Xe).
*   Se X é um tipo não-classe, não-array, o conjunto M(X) é vazio.

Uma _struct standard-layout_ é uma classe standard-layout definida com a palavra-chave [`struct`](<#/doc/keyword/struct>) ou a palavra-chave [`class`](<#/doc/keyword/class>). Uma _union standard-layout_ é uma classe standard-layout definida com a palavra-chave [`union`](<#/doc/keyword/union>).

(desde C++11)

#### Classe implicit-lifetime

Uma _classe implicit-lifetime_ é uma classe que

*   é um [aggregate](<#/doc/language/aggregate_initialization>) cujo destrutor não é declarado pelo usuário (até C++11) [fornecido pelo usuário](<#/doc/language/function>) (desde C++11), ou
*   tem pelo menos um construtor elegível trivial e um destrutor trivial e não deletado.

Notas: a propriedade implicit-lifetime é esclarecida pelo relatório de defeito [P0593R6](<https://wg21.link/P0593R6>).

#### Classe POD

Uma _classe POD_ é uma classe que |

*   é um [aggregate](<#/doc/language/aggregate_initialization>),
*   não tem operador de atribuição de cópia declarado pelo usuário,
*   não tem destrutor declarado pelo usuário, e
*   não tem membros de dados não estáticos do tipo classe non-POD (ou array de tais tipos) ou referência.

| (até C++11)

*   é uma classe trivial,
*   é uma classe standard-layout, e
*   não tem membros de dados não estáticos do tipo classe non-POD (ou array de tais tipos).

| (desde C++11)

Uma _struct POD_ é uma classe POD não-union. Uma _union POD_ é uma union que é uma classe POD.

(depreciado em C++20)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 148](<https://cplusplus.github.io/CWG/issues/148.html>) | C++98 | Classes POD não podiam conter ponteiros para membros, que são eles próprios tipos POD (escalares) | restrição removida
[CWG 383](<https://cplusplus.github.io/CWG/issues/383.html>) | C++98 | operadores de atribuição de cópia ou destrutores podiam ser declarados pelo usuário em classes POD se não fossem definidos | não permitido
[CWG 1363](<https://cplusplus.github.io/CWG/issues/1363.html>) | C++11 | uma classe que tem construtores padrão triviais e construtores padrão não triviais ao mesmo tempo poderia ser trivial | não é trivial
[CWG 1496](<https://cplusplus.github.io/CWG/issues/1496.html>) | C++11 | uma classe que só tem construtores que são todos definidos como deletados poderia ser trivial | não é trivial
[CWG 1672](<https://cplusplus.github.io/CWG/issues/1672.html>) | C++11 | uma classe poderia ser uma classe standard-layout se tivesse múltiplas classes base vazias | não é uma classe standard-layout
[CWG 1734](<https://cplusplus.github.io/CWG/issues/1734.html>) | C++11 | uma classe trivially copyable não poderia ter construtores/operadores de atribuição de cópia/movimento deletados não triviais | pode ser trivial se deletado
[CWG 1813](<https://cplusplus.github.io/CWG/issues/1813.html>) | C++11 | uma classe nunca era uma classe standard-layout se tivesse uma classe base que herda um membro de dados não estático | pode ser uma classe standard-layout
[CWG 1881](<https://cplusplus.github.io/CWG/issues/1881.html>) | C++11 | para uma classe standard-layout e suas classes base, bit-fields sem nome poderiam ser declarados em uma classe diferente declarando os membros de dados | todos os membros de dados não estáticos e bit-fields precisam ser declarados primeiro na mesma classe
[CWG 1909](<https://cplusplus.github.io/CWG/issues/1909.html>) | C++98 | um member template poderia ter o mesmo nome que sua classe | proibido
[CWG 2120](<https://cplusplus.github.io/CWG/issues/2120.html>) | C++11 | a definição de M(X) na determinação de uma classe standard-layout não considerava o caso de uma classe cujo primeiro membro é um array | abordou este caso na definição de M(X)
[CWG 2605](<https://cplusplus.github.io/CWG/issues/2605.html>) | C++98 | uma classe implicit-lifetime poderia ter um destrutor fornecido pelo usuário | proibido