# Pontuação

Estes são os símbolos de pontuação em C++. O significado de cada símbolo é detalhado nas páginas linkadas.

### Operadores de pré-processamento

Operadores de pré-processamento são reconhecidos por [pré-processadores](<#/doc/preprocessor>).

#### # (incluindo %:)

  * Introduz uma [diretiva de pré-processamento](<#/doc/preprocessor>).
  * O [operador de pré-processamento para stringification](<#/doc/preprocessor/replace>).

#### ##(incluindo %:%:)

  * O [operador de pré-processamento para colagem de tokens](<#/doc/preprocessor/replace>).

### Operadores e pontuadores de caractere único

#### { e } (incluindo <% e %>)

  * Em uma definição de [classe](<#/doc/language/class>), delimitam a [especificação de membro](<#/doc/language/class>).
  * Em uma definição de [enumeração](<#/doc/language/enum>), delimitam a lista de enumeradores.
  * Delimitam uma [instrução composta](<#/doc/language/statements>). A instrução composta pode ser parte de

    

  * uma [definição de função](<#/doc/language/function>)
  * um [bloco try](<#/doc/language/try>)

    

  * uma [expressão lambda](<#/doc/language/lambda>)

| (desde C++11)
  
  * Parte da sintaxe de [inicialização de agregado](<#/doc/language/aggregate_initialization>)(até C++11)[inicialização de lista](<#/doc/language/list_initialization>)(desde C++11) de um [inicializador](<#/doc/language/initialization>).
  * Em uma definição de [namespace](<#/doc/language/namespace>), delimitam o corpo do namespace.
  * Em uma [especificação de ligação de linguagem](<#/doc/language/language_linkage>), delimitam as declarações.

  * Em uma [requires expression](<#/doc/language/constraints>), delimitam os requisitos.
  * Em um [requisito composto](<#/doc/language/constraints>), delimitam a expressão.
  * Em uma [declaração export](<#/doc/language/modules>), delimitam as declarações.

| (desde C++20)
  
#### [ e ] (incluindo <: e :>)

  * [Operador de subscrito](<#/doc/language/operator_member_access>); parte de operator[] em [sobrecarga de operador](<#/doc/language/operators>).
  * Parte do [declarador de array](<#/doc/language/declarations>) em uma [declaração](<#/doc/language/declarations>) ou um [type-id](<#/doc/language/type-id>) (por exemplo, em uma [new expression](<#/doc/language/new>)).
  * Parte do operador new[] em [sobrecarga de operador (função de alocação)](<#/doc/memory/new/operator_new>).
  * Parte do operador delete[] em [delete expression](<#/doc/language/delete>) e [sobrecarga de operador (função de desalocação)](<#/doc/memory/new/operator_delete>).

  * Em uma [expressão lambda](<#/doc/language/lambda>), delimitam as [capturas](<#/doc/language/lambda>).
  * Em um [especificador de atributo](<#/doc/language/attributes>), delimitam os atributos.

| (desde C++11)
  
  * Em uma [declaração de structured binding](<#/doc/language/structured_binding>), delimitam a lista de identificadores.

| (desde C++17)
  
  * Em um [pack indexing](<#/doc/language/pack_indexing>), delimitam uma [converted constant expression](<#/doc/language/constant_expression>) representando um índice.

| (desde C++26)
  
#### ( e )

  * Em uma expressão, [indicam agrupamento](<#/doc/language/expressions>).
  * [Operador de chamada de função](<#/doc/language/operator_other>); parte de operator() em [sobrecarga de operador](<#/doc/language/operators>).
  * Em um [type cast estilo função](<#/doc/language/explicit_cast>), delimitam a expressão/inicializadores.
  * Em um [`static_cast`](<#/doc/language/static_cast>), [`const_cast`](<#/doc/language/const_cast>), [`reinterpret_cast`](<#/doc/language/reinterpret_cast>), ou [`dynamic_cast`](<#/doc/language/dynamic_cast>), delimitam a expressão.
  * Delimitam o operando dos seguintes operadores:

    

  * [`typeid`](<#/doc/language/typeid>)
  * [`sizeof`](<#/doc/language/sizeof>)

    

  * [`sizeof...`](<#/doc/language/sizeof...>)
  * [`alignof`](<#/doc/language/alignof>)
  * [`noexcept`](<#/doc/language/noexcept>)

| (desde C++11)
  
  * Em uma [placement new expression](<#/doc/language/new>), delimitam os argumentos de placement.
  * Em uma [new expression](<#/doc/language/new>), opcionalmente delimitam o type-id.
  * Em uma [new expression](<#/doc/language/new>), delimitam os inicializadores.
  * Em um [cast estilo C](<#/doc/language/explicit_cast>), delimitam o type-id.
  * Em uma [declaração](<#/doc/language/declarations>) ou um [type-id](<#/doc/language/type-id>), indicam agrupamento.
  * Delimitam a lista de parâmetros em

    

  * um [declarador de função](<#/doc/language/function>) (em uma [declaração](<#/doc/language/declarations>) ou um [type-id](<#/doc/language/type-id>))

    

  * uma [expressão lambda](<#/doc/language/lambda>)

| (desde C++11)
  
    

  * um [guia de dedução definido pelo usuário](<#/doc/language/ctad>)

| (desde C++17)
  
    

  * uma [requires expression](<#/doc/language/constraints>)

| (desde C++20)
  
  * Parte da sintaxe de [inicialização direta](<#/doc/language/direct_initialization>) de um [inicializador](<#/doc/language/initialization>).
  * Em uma [declaração asm](<#/doc/language/asm>), delimitam o literal de string.
  * Em uma [lista de inicializadores de membro](<#/doc/language/initializer_list>), delimitam os inicializadores para uma base ou membro.
  * Delimitam a cláusula de controle de uma instrução de seleção ou instrução de iteração, incluindo:

    

  * [`if`](<#/doc/language/if>) (exceto [consteval if](<#/doc/language/if>))(desde C++23)
  * [`switch`](<#/doc/language/switch>)
  * [`while`](<#/doc/language/while>)
  * [`do-while`](<#/doc/language/do>)
  * [`for`](<#/doc/language/for>)

    

  * [`for` baseado em range](<#/doc/language/range-for>)

| (desde C++11)
  
  * Em um [handler](<#/doc/language/catch>), delimitam a declaração de parâmetro.
  * Em uma [definição de macro tipo função](<#/doc/preprocessor/replace>), delimitam os parâmetros da macro.
  * Em uma [invocação de macro tipo função](<#/doc/preprocessor/replace>), delimitam os argumentos da macro ou impedem que vírgulas sejam interpretadas como separadores de argumento.
  * Parte de um operador de pré-processamento `defined`, `__has_include`(desde C++17), `__has_cpp_attribute`(desde C++20).

  * Em uma declaração [`static_assert`](<#/doc/language/static_assert>), delimitam os operandos.
  * Delimitam o operando dos seguintes especificadores:

    

  * [`decltype`](<#/doc/language/decltype>)
  * [`noexcept`](<#/doc/language/noexcept_spec>)
  * [`alignas`](<#/doc/language/alignas>)

| 

    

  * [`explicit`](<#/doc/language/explicit>)

| (desde C++20)
  
  * Em um [atributo](<#/doc/language/attributes>), delimitam os argumentos do atributo.

(desde C++11)
  
  * Parte do especificador [`decltype(auto)`](<#/doc/language/decltype>).

| (desde C++14)
  
  * Delimitam uma [fold expression](<#/doc/language/fold>).

| (desde C++17)
  
  * Parte da substituição [`__VA_OPT__`](<#/doc/preprocessor/replace>) em uma definição de macro variádica.

| (desde C++20)
  
#### ;

  * Indica o fim de

    

  * uma [instrução](<#/doc/language/statements>)
  * uma [declaração](<#/doc/language/declarations>) ou [declaração de membro](<#/doc/language/class>)

    

  * uma [declaração de módulo](<#/doc/language/modules>), declaração de importação, introdução de fragmento de módulo global ou introdução de fragmento de módulo privado
  * um [requisito](<#/doc/language/constraints>)

| (desde C++20)
  
  * Separa a condição e a instrução de uma [instrução for](<#/doc/language/for>).

#### :

  * Parte do [operador condicional](<#/doc/language/operator_other>).
  * Parte da [declaração de rótulo](<#/doc/language/statements>).
  * Na cláusula base de uma [definição de classe](<#/doc/language/class>), introduz a [classe base](<#/doc/language/derived_class>).
  * Parte do [especificador de acesso](<#/doc/language/access>) na especificação de membro.
  * Em uma [declaração de membro bit-field](<#/doc/language/bit_field>), introduz a largura.
  * Em uma definição de [construtor](<#/doc/language/initializer_list>), introduz a lista de inicializadores de membro.

  * Em uma instrução [`for` baseado em range](<#/doc/language/range-for>), separa a declaração do item e o inicializador de range.
  * Na base enum de uma [declaração de enumeração](<#/doc/language/enum>), introduz o tipo subjacente.

| (desde C++11)
  
  * Em um [especificador de atributo](<#/doc/language/attributes>), separa o namespace do atributo e a lista de atributos.

| (desde C++17)
  
  * Em uma [declaração de módulo](<#/doc/language/modules>) ou declaração de importação de partição de módulo, introduz o nome da partição do módulo.
  * Parte de um introdução de [fragmento de módulo privado](<#/doc/language/modules>) (module :private;).

| (desde C++20)
  
#### ?

  * Parte do [operador condicional](<#/doc/language/operator_other>).

#### .

  * [Operador de acesso a membro](<#/doc/language/operator_member_access>).

  * Em [inicialização de agregado](<#/doc/language/aggregate_initialization>), introduz um designador.
  * Parte do [nome do módulo ou nome da partição do módulo](<#/doc/language/modules>).

| (desde C++20)
  
#### ~ (incluindo compl)

  * [Operador de complemento unário (também conhecido como operador bitwise not)](<#/doc/language/operator_arithmetic>); parte de operator~ em [sobrecarga de operador](<#/doc/language/operators>).
  * Parte de uma [expressão identificadora](<#/doc/language/name>) para nomear um [destrutor](<#/doc/language/destructor>) ou pseudo-destrutor.

#### ! (incluindo not)

  * [Operador lógico not](<#/doc/language/operator_logical>); parte de operator! em [sobrecarga de operador](<#/doc/language/operators>).

  * Parte da instrução [consteval if](<#/doc/language/if>).

| (desde C++23)
  
#### +

  * [Operador unário de adição](<#/doc/language/operator_arithmetic>); parte de operator+ em [sobrecarga de operador](<#/doc/language/operators>).
  * [Operador binário de adição](<#/doc/language/operator_arithmetic>); parte de operator+ em [sobrecarga de operador](<#/doc/language/operators>).

#### -

  * [Operador unário de subtração](<#/doc/language/operator_arithmetic>); parte de operator- em [sobrecarga de operador](<#/doc/language/operators>).
  * [Operador binário de subtração](<#/doc/language/operator_arithmetic>); parte de operator- em [sobrecarga de operador](<#/doc/language/operators>).

#### *

  * [Operador de indireção](<#/doc/language/operator_member_access>); parte de operator* em [sobrecarga de operador](<#/doc/language/operators>).
  * [Operador de multiplicação](<#/doc/language/operator_arithmetic>); parte de operator* em [sobrecarga de operador](<#/doc/language/operators>).
  * Operador de ponteiro ou parte do operador ponteiro para membro em um [declarador](<#/doc/language/declarations>) ou em um [type-id](<#/doc/language/type-id>).

  * Parte de *this em uma lista de [captura lambda](<#/doc/language/lambda>), para capturar o objeto atual por cópia.

| (desde C++17)
  
#### /

  * [Operador de divisão](<#/doc/language/operator_arithmetic>); parte de operator/ em [sobrecarga de operador](<#/doc/language/operators>).

#### %

  * [Operador de módulo](<#/doc/language/operator_arithmetic>); parte de operator% em [sobrecarga de operador](<#/doc/language/operators>).

#### ^ (incluindo xor)

  * [Operador bitwise xor](<#/doc/language/operator_arithmetic>); parte de operator^ em [sobrecarga de operador](<#/doc/language/operators>).

#### & (incluindo bitand)

  * [Operador address-of](<#/doc/language/operator_member_access>); parte de operator& em [sobrecarga de operador](<#/doc/language/operators>).
  * [Operador bitwise and](<#/doc/language/operator_arithmetic>); parte de operator& em [sobrecarga de operador](<#/doc/language/operators>).
  * Operador de referência lvalue em um [declarador](<#/doc/language/declarations>) ou em um [type-id](<#/doc/language/type-id>).

  * Em uma [captura lambda](<#/doc/language/lambda>), indica captura por referência.
  * [Qualificador de referência](<#/doc/language/member_functions>) em [declaração de função membro](<#/doc/language/member_functions>).

| (desde C++11)
  
#### | (incluindo bitor)

  * [Operador bitwise or](<#/doc/language/operator_arithmetic>); parte de operator| em [sobrecarga de operador](<#/doc/language/operators>).

#### =

  * [Operador de atribuição simples](<#/doc/language/operator_assignment>); parte de operator= em [sobrecarga de operador](<#/doc/language/operators>), que pode ser uma função membro especial ([operador de atribuição de cópia](<#/doc/language/as_operator>) ou [operador de atribuição de movimento](<#/doc/language/move_operator>)(desde C++11)).
  * Parte da sintaxe de [inicialização por cópia](<#/doc/language/copy_initialization>) e [inicialização de agregado](<#/doc/language/aggregate_initialization>)(até C++11)[inicialização de lista por cópia](<#/doc/language/list_initialization>)(desde C++11) de um [inicializador](<#/doc/language/initialization>).
  * Em uma [declaração de função](<#/doc/language/function>), introduz um [argumento padrão](<#/doc/language/default_arguments>).
  * Em uma [lista de parâmetros de template](<#/doc/language/template_parameters>), introduz um [argumento de template padrão](<#/doc/language/template_parameters>).
  * Em uma [definição de alias de namespace](<#/doc/language/namespace_alias>), separa o alias e o namespace apelidado.
  * Em uma [definição de enum](<#/doc/language/enum>), introduz o valor do enumerador.
  * Parte do especificador pure em uma [declaração de função virtual pura](<#/doc/language/abstract_class>).

  * Captura padrão em [captura lambda](<#/doc/language/lambda>), para indicar captura por cópia.
  * Parte da definição padronizada (=default;) ou definição deletada (=delete;) em [definição de função](<#/doc/language/function>).
  * Em uma [declaração de alias de tipo](<#/doc/language/type_alias>), separa o alias e o tipo apelidado.

| (desde C++11)
  
  * Em uma [definição de concept](<#/doc/language/constraints>), separa o nome do concept e a expressão de restrição.

| (desde C++20)
  
#### <

  * [Operador less-than](<#/doc/language/operator_comparison>); parte de operator< em [sobrecarga de operador](<#/doc/language/operators>).
  * Em um [`static_cast`](<#/doc/language/static_cast>), [`const_cast`](<#/doc/language/const_cast>), [`reinterpret_cast`](<#/doc/language/reinterpret_cast>), ou [`dynamic_cast`](<#/doc/language/dynamic_cast>), introduz o type-id.
  * Introduz uma [lista de argumentos de template](<#/doc/language/template_parameters>).
  * Introduz uma [lista de parâmetros de template](<#/doc/language/template_parameters>) em

    

  * uma [declaração de template](<#/doc/language/templates>)
  * uma [especialização parcial](<#/doc/language/partial_specialization>)

    

  * uma [expressão lambda](<#/doc/language/lambda>)

| (desde C++20)
  
  * Parte de template<> em [declaração de especialização de template](<#/doc/language/template_specialization>).
  * Introduz um nome de header em

    

  * uma [diretiva #include](<#/doc/preprocessor/include>)

    

  * uma [expressão de pré-processamento __has_include](<#/doc/preprocessor/include>)

| (desde C++17)
  
    

  * uma [declaração de importação](<#/doc/language/modules>)

| (desde C++20)
  
#### >

  * [Operador greater-than](<#/doc/language/operator_comparison>); parte de operator> em [sobrecarga de operador](<#/doc/language/operators>).
  * [`static_cast`](<#/doc/language/static_cast>), [`const_cast`](<#/doc/language/const_cast>), [`reinterpret_cast`](<#/doc/language/reinterpret_cast>), ou [`dynamic_cast`](<#/doc/language/dynamic_cast>), indicam o fim do type-id.
  * Indica o fim de uma [lista de argumentos de template](<#/doc/language/template_parameters>).
  * Indica o fim de uma [lista de parâmetros de template](<#/doc/language/template_parameters>) em

    

  * uma [declaração de template](<#/doc/language/templates>)
  * uma [especialização parcial](<#/doc/language/partial_specialization>)

    

  * uma [expressão lambda](<#/doc/language/lambda>)

| (desde C++20)
  
  * Parte de template<> em [declaração de especialização de template](<#/doc/language/template_specialization>).
  * Indica o fim de um nome de header em

    

  * uma [diretiva #include](<#/doc/preprocessor/include>)

    

  * uma [expressão de pré-processamento __has_include](<#/doc/preprocessor/include>)

| (desde C++17)
  
    

  * uma [declaração de importação](<#/doc/language/modules>)

| (desde C++20)
  
#### ,

  * [Operador vírgula](<#/doc/language/operator_other>); parte de operator, em [sobrecarga de operador](<#/doc/language/operators>).
  * Separador de lista em

    

  * a lista de declaradores em uma [declaração](<#/doc/language/declarations>)
  * lista de inicializadores em [inicialização](<#/doc/language/initialization>)
  * a lista de argumentos de placement em um [placement new](<#/doc/language/new>)
  * a lista de argumentos em uma [expressão de chamada de função](<#/doc/language/operator_other>)
  * a lista de enumeradores em uma [declaração de enum](<#/doc/language/enum>)
  * a lista de [classes base](<#/doc/language/derived_class>) em uma [declaração de classe](<#/doc/language/class>)
  * a lista de inicializadores de membro em uma [definição de construtor](<#/doc/language/initializer_list>)
  * uma [lista de parâmetros de função](<#/doc/language/function>)
  * uma [lista de parâmetros de template](<#/doc/language/template_parameters>)
  * uma [lista de argumentos de template](<#/doc/language/template_parameters>)

    

  * uma lista de [captura lambda](<#/doc/language/lambda>)
  * uma lista de [atributos](<#/doc/language/attributes>)

| (desde C++11)
  
    

  * a lista de declaradores em uma [using-declaration](<#/doc/language/namespace>)
  * a lista de identificadores em uma [declaração de structured binding](<#/doc/language/structured_binding>)

| (desde C++17)
  
    

  * a lista de argumentos em uma [expressão de subscrito multi-argumento](<#/doc/language/operator_member_access>)

| (desde C++23)
  
    

  * a lista de parâmetros da macro em uma [definição de macro tipo função](<#/doc/preprocessor/replace>)
  * a lista de argumentos da macro em uma [invocação de macro tipo função](<#/doc/preprocessor/replace>), a menos que encontrada entre os parênteses de um argumento

  * Em uma declaração [`static_assert`](<#/doc/language/static_assert>), separa os argumentos.

| (desde C++11)
  
### Operadores e pontuadores de múltiplos caracteres

#### ...

  * Na [lista de parâmetros](<#/doc/language/function>) de um declarador de função ou expressão lambda (desde C++11) ou guia de dedução definido pelo usuário (desde C++17), significa uma [função variádica](<#/doc/language/variadic_arguments>).
  * Em um [handler](<#/doc/language/catch>), significa um handler catch-all.

  * Em uma [definição de macro](<#/doc/preprocessor/replace>), significa uma macro variádica.
  * Indica declaração e expansão de [pack](<#/doc/language/parameter_pack>).

| (desde C++11)
  
  * Em expressão e especificador de [pack indexing](<#/doc/language/pack_indexing>).

| (desde C++26)
  
#### ::

  * Operador de resolução de escopo em

    

  * um [nome qualificado](<#/doc/language/qualified_lookup>)
  * uma [declaração de ponteiro para membro](<#/doc/language/pointer>)
  * uma expressão [`new`](<#/doc/language/new>) ou [`delete`](<#/doc/language/delete>), para indicar que apenas funções globais de alocação ou desalocação são procuradas

  * Em um [atributo](<#/doc/language/attributes>), indica o escopo do atributo.

| (desde C++11)
  
  * Parte da [definição de namespace aninhado](<#/doc/language/namespace>).

| (desde C++17)
  
#### .*

  * [Operador de acesso a ponteiro para membro](<#/doc/language/operator_member_access>).

#### ->

  * [Operador de acesso a membro](<#/doc/language/operator_member_access>); parte de operator-> em [sobrecarga de operador](<#/doc/language/operators>).

  * Em um [declarador de função](<#/doc/language/function>) ou [expressão lambda](<#/doc/language/lambda>), introduz o tipo de retorno trailing.

| (desde C++11)
  
  * Em um [guia de dedução definido pelo usuário](<#/doc/language/ctad>), introduz o tipo de resultado.

| (desde C++17)
  
  * Em um [requisito composto](<#/doc/language/constraints>), introduz o requisito de tipo de retorno.

| (desde C++20)
  
#### ->*

  * [Operador de acesso a ponteiro para membro](<#/doc/language/operator_member_access>); parte de operator->* em [sobrecarga de operador](<#/doc/language/operators>).

#### +=

  * [Operador de atribuição composta](<#/doc/language/operator_assignment>); parte de operator+= em [sobrecarga de operador](<#/doc/language/operators>).

#### -=

  * [Operador de atribuição composta](<#/doc/language/operator_assignment>); parte de operator-= em [sobrecarga de operador](<#/doc/language/operators>).

#### *=

  * [Operador de atribuição composta](<#/doc/language/operator_assignment>); parte de operator*= em [sobrecarga de operador](<#/doc/language/operators>).

#### /=

  * [Operador de atribuição composta](<#/doc/language/operator_assignment>); parte de operator/= em [sobrecarga de operador](<#/doc/language/operators>).

#### %=

  * [Operador de atribuição composta](<#/doc/language/operator_assignment>); parte de operator%= em [sobrecarga de operador](<#/doc/language/operators>).

#### ^= (incluindo xor_eq)

  * [Operador de atribuição composta](<#/doc/language/operator_assignment>); parte de operator^= em [sobrecarga de operador](<#/doc/language/operators>).

#### &= (incluindo and_eq)

  * [Operador de atribuição composta](<#/doc/language/operator_assignment>); parte de operator&= em [sobrecarga de operador](<#/doc/language/operators>).

#### |= (incluindo or_eq)

  * [Operador de atribuição composta](<#/doc/language/operator_assignment>); parte de operator|= em [sobrecarga de operador](<#/doc/language/operators>).

#### ==

  * [Operador de igualdade](<#/doc/language/operator_comparison>); parte de operator== em [sobrecarga de operador](<#/doc/language/operators>).

#### != (incluindo not_eq)

  * [Operador de desigualdade](<#/doc/language/operator_comparison>); parte de operator!= em [sobrecarga de operador](<#/doc/language/operators>).

#### <=

  * [Operador less-than-or-equal-to](<#/doc/language/operator_comparison>); parte de operator<= em [sobrecarga de operador](<#/doc/language/operators>).

#### >=

  * [Operador greater-than-or-equal-to](<#/doc/language/operator_comparison>); parte de operator>= em [sobrecarga de operador](<#/doc/language/operators>).

#### <=>

  * [Operador de comparação de três vias (spaceship)](<#/doc/language/operator_comparison>); parte de operator<=> em [sobrecarga de operador](<#/doc/language/operators>).

| (desde C++20)
  
#### && (incluindo and)

  * [Operador lógico and](<#/doc/language/operator_logical>); parte de operator&& em [sobrecarga de operador](<#/doc/language/operators>).

  * Operador de referência rvalue em um [declarador](<#/doc/language/declarations>) ou em um [type-id](<#/doc/language/type-id>).
  * [Qualificador de referência](<#/doc/language/member_functions>) em [declaração de função membro](<#/doc/language/member_functions>).

| (desde C++11)
  
#### || (incluindo or)

  * [Operador lógico or](<#/doc/language/operator_logical>); parte de operator|| em [sobrecarga de operador](<#/doc/language/operators>).

#### <<

  * [Operador de deslocamento bitwise](<#/doc/language/operator_arithmetic>); parte de operator<< em sobrecarga de operador ([operador bitwise](<#/doc/language/operators>) ou [operador de inserção de stream](<#/doc/language/operators>)).

#### >>

  * [Operador de deslocamento bitwise](<#/doc/language/operator_arithmetic>); parte de operator>> em sobrecarga de operador ([operador bitwise](<#/doc/language/operators>) ou [operador de extração de stream](<#/doc/language/operators>)).

#### <<=

  * [Operador de atribuição composta](<#/doc/language/operator_assignment>); parte de operator<<= em [sobrecarga de operador](<#/doc/language/operators>).

#### >>=

  * [Operador de atribuição composta](<#/doc/language/operator_assignment>); parte de operator>>= em [sobrecarga de operador](<#/doc/language/operators>).

#### ++

  * [Operador de incremento](<#/doc/language/operator_incdec>); parte de operator++ em [sobrecarga de operador](<#/doc/language/operators>).

#### --

  * [Operador de decremento](<#/doc/language/operator_incdec>); parte de operator-- em [sobrecarga de operador](<#/doc/language/operators>).

### Referências

  * Padrão C++23 (ISO/IEC 14882:2024):

    

  * 5.12 Operadores e pontuadores [lex.operators]

  * Padrão C++20 (ISO/IEC 14882:2020):

    

  * 5.12 Operadores e pontuadores [lex.operators]

  * Padrão C++17 (ISO/IEC 14882:2017):

    

  * 5.12 Operadores e pontuadores [lex.operators]

  * Padrão C++14 (ISO/IEC 14882:2014):

    

  * 2.13 Operadores e pontuadores [lex.operators]

  * Padrão C++11 (ISO/IEC 14882:2011):

    

  * 2.13 Operadores e pontuadores [lex.operators]

  * Padrão C++03 (ISO/IEC 14882:2003):

    

  * 2.12 Operadores e pontuadores [lex.operators]

  * Padrão C++98 (ISO/IEC 14882:1998):

    

  * 2.12 Operadores e pontuadores [lex.operators]

### Veja também

[ Representações alternativas ](<#/doc/language/operator_alternative>) | grafias alternativas para certos operadores
[Documentação C](<#/>) para Pontuação