# Extensões para reflexão

As Extensões C++ para Reflexão, ISO/IEC TS 23619:2021, especificam modificações na linguagem principal e definem novos componentes para a biblioteca padrão C++ listados nesta página.

O Reflection TS é baseado no padrão C++20 (exceto que a definição de concepts é especificada no estilo do [Concepts TS](<#/doc/experimental/constraints>)).

### Mudanças na linguagem principal

#### especificador-reflexpr

Um reflexpr-specifier tem a forma `reflexpr` `(` reflexpr-operand `)`, e especifica um tipo de meta-objeto (veja abaixo).

reflexpr-operand pode ser um dos seguintes:

---
`::` | (1) |
---|---|---
type-id | (2) |
nested-name-specifier(optional) namespace-name | (3) |
id-expression | (4) |
`(` expression `)` | (5) |
function-call-expression | (6) |
functional-type-conv-expression | (7) |

onde function-call-expression é

---
postfix-expression `(` expression-list(optional) `)`

e functional-type-conv-expression são os seguintes tipos de expressões que realizam [conversão explícita](<#/doc/language/explicit_cast>):

---
simple-type-specifier `(` expression-list(optional) `)` | (1) |
---|---|---
typename-specifier `(` expression-list(optional) `)` | (2) |
simple-type-specifier braced-init-list | (3) |
typename-specifier braced-init-list | (4) |

O operando para o reflexpr-specifier deve ser um [tipo](<#/doc/language/type-id>), [namespace](<#/doc/language/namespace>), [enumerador](<#/doc/language/enum>), variável, [membro de dados](<#/doc/language/data_members>), [parâmetro de função](<#/doc/language/function>), [entidade capturada](<#/doc/language/lambda>), function-call-expression ou functional-type-conv-expression, e expressão entre parênteses. reflexpr(::) reflete o namespace global.

Para um reflexpr-operand da forma `(` expression `)`, a expressão deve ser uma function-call-expression ou functional-type-conv-expression (possivelmente com múltiplos parênteses).

Se um operando não-parentesizado puder ser tratado como um type-id ou uma functional-type-conv-expression, então ele é tratado como um type-id. Parênteses podem ser usados para desambiguação entre um cast no estilo de função e um type-id. Por exemplo, dada uma classe `X` com construtor padrão, reflexpr(X()) reflete o tipo de função X(), e reflexpr((X())) reflete a expressão X().

Se o operando designar tanto um alias quanto um nome de classe, o tipo representado pelo reflexpr-specifier reflete o alias e satisfaz `reflect::Alias`.

Se o operando designar um nome cuja declaração está contida em um escopo de bloco e a entidade nomeada não for capturada nem um parâmetro de função, o programa é malformado.

#### Tipos de meta-objeto

Um _tipo de meta-objeto_ é um tipo de classe de escopo de namespace incompleto e sem nome. Um tipo satisfaz o concept `reflect::Object` se e somente se for um tipo de meta-objeto. Tipos de meta-objeto podem satisfazer outros concepts, dependendo do operando para `reflexpr`.

É não especificado se a aplicação repetida de `reflexpr` ao mesmo operando produz o mesmo tipo ou um tipo diferente. Se um tipo de meta-objeto reflete um tipo de classe incompleto, certas transformações de tipo não podem ser aplicadas.

Um tipo de meta-objeto permite a inspeção de algumas propriedades do operando para `reflexpr` através de type traits ou transformações de tipo nele.

#### Resolução de sobrecarga

Se a postfix-expression da function-call-expression for de um tipo de classe, ou seja, `e` na function-call-expression `e(args)` for de um tipo de classe, então a [função de conversão definida pelo usuário](<#/doc/language/cast_operator>) do tipo da postfix-expression (`e`) não deve ser usada.

Se postfix-expression não for de um tipo de classe, ela deve nomear uma função que é o resultado único da resolução de sobrecarga.
```cpp
    struct Functor
    {
        void operator()(int) const;
    
        using fptr_t = void(*)(std::nullptr_t);
        operator fptr_t() const;
    };
    
    using Meta0 = reflexpr(Functor{}(0));          // OK
    // using Meta1 = reflexpr(Functor{}(nullptr)); // error: conversion function used
```

#### Relacionado à reflexão

Um _alias_ é um nome introduzido por uma declaração [`typedef`](<#/doc/language/typedef>), uma [alias-declaration](<#/doc/language/type_alias>), ou uma [using-declaration](<#/doc/language/using_declaration>).

Uma entidade ou alias `B` está _relacionado à reflexão_ com uma entidade ou alias `A` se

  1. `A` e `B` são a mesma entidade ou alias,
  2. `A` é uma variável ou enumerador e `B` é o tipo de `A`,
  3. `A` é uma enumeração e `B` é o tipo subjacente de `A`,
  4. `A` é uma classe e `B` é um membro ou classe base de `A`,
  5. `A` é um alias não-template que designa a entidade `B`,
  6. `A` não é o namespace global e `B` é uma classe ou namespace envolvente de `A`,
  7. `A` é a expressão entre parênteses (`B`),
  8. `A` é uma captura lambda do tipo de closure `B`,
  9. `A` é o tipo de closure da captura lambda `B`,
  10. `B` é o tipo especificado pela functional-type-conv-expression `A`,
  11. `B` é a função selecionada pela resolução de sobrecarga para uma function-call-expression `A`,
  12. `B` é o tipo de retorno, um tipo de parâmetro, ou tipo de função da função `A`, ou
  13. `B` está relacionado à reflexão com uma entidade ou alias `X` e `X` está relacionado à reflexão com `A`.

A relação de reflexão é reflexiva e transitiva, mas não simétrica.

Informalmente, o caso em que `B` está relacionado à reflexão com `A` significa que `B` participa da declaração ou definição de `A`.

Zero ou mais aplicações sucessivas de transformações de tipo que produzem tipos de meta-objeto para o tipo denotado por um reflexpr-specifier permitem a inspeção de entidades e aliases que estão relacionados à reflexão com o operando; tal tipo de meta-objeto é dito refletir a respectiva entidade ou alias relacionado à reflexão.
```cpp
    struct X;
    struct B
    {
        using X = ::X;
        typedef X Y;
    };
    struct D : B
    {
        using B::Y;
    };
    // ::X, mas não B::X ou B::Y está relacionado à reflexão com D::Y
```

#### Diversos

  * Uma expressão usada como reflexpr-operand é uma [expressão não avaliada](<#/doc/language/expressions>) e [potencialmente avaliada em tempo de compilação](<#/doc/language/constant_expression>).
  * Para fins de determinação de variáveis [capturadas em uma expressão lambda](<#/doc/language/lambda>) por um capture-default, um operando `reflexpr` não é considerado um operando não avaliado.
  * Uma função ou variável com [duração de armazenamento](<#/doc/language/storage_duration>) estática refletida pelo tipo de meta-objeto `T` é [odr-used](<#/doc/language/definition>) pela especialização std::experimental::reflect::get_pointer&lt;T&gt;, como se estivesse pegando o endereço de uma id-expression que nomeia a função ou variável.
  * Pode haver mais de uma definição de um tipo de meta-objeto, desde que todas as operações neste tipo produzam os mesmos resultados de expressão constante.
  * Um tipo é [dependente](<#/doc/language/dependent_name>) se for denotado por um reflexpr-specifier, e o operando
    * for uma [expressão dependente de tipo](<#/doc/language/dependent_name>) ou uma functional-type-conv-expression (possivelmente entre parênteses) com pelo menos uma subexpressão imediata dependente de tipo, ou
    * designar um tipo dependente ou um membro de uma [especialização desconhecida](<#/doc/language/dependent_name>) ou uma [expressão constante dependente de valor](<#/doc/language/dependent_name>).

#### Palavras-chave

[`reflexpr`](<#/doc/keyword/reflexpr>)

#### Macros de teste de recurso predefinidas

__cpp_reflection(reflection TS) | um valor de pelo menos 201902 indica que o Reflection TS é suportado
(macro constant)

### Suporte à biblioteca

#### Concepts

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`
---
Definido no namespace `std::experimental::reflect`

```cpp
Definido no inline namespace `std::experimental::reflect::v1`
 Object(reflection TS)
(concept)
 ObjectSequence(reflection TS)
(concept)
 TemplateParameterScope")(reflection TS)
(concept)
 Named(reflection TS)
(concept)
 Alias(reflection TS)
(concept)
 RecordMember(reflection TS)
(concept)
 Enumerator(reflection TS)
(concept)
 Variable(reflection TS)
(concept)
 ScopeMember(reflection TS)
(concept)
 Typed(reflection TS)
(concept)
 Namespace(reflection TS)
(concept)
 GlobalScope(reflection TS)
(concept)
 Class(reflection TS)
(concept)
 Enum(reflection TS)
(concept)
 Record(reflection TS)
(concept)
 Scope(reflection TS)
(concept)
 Type(reflection TS)
(concept)
 Constant(reflection TS)
(concept)
 Base(reflection TS)
(concept)
 FunctionParameter(reflection TS)
(concept)
 Callable(reflection TS)
(concept)
 Expression(reflection TS)
(concept)
 ParenthesizedExpression(reflection TS)
(concept)
 FunctionCallExpression(reflection TS)
(concept)
 FunctionalTypeConversion(reflection TS)
(concept)
 Function(reflection TS)
(concept)
 MemberFunction(reflection TS)
(concept)
 SpecialMemberFunction(reflection TS)
(concept)
 Constructor(reflection TS)
(concept)
 Destructor(reflection TS)
(concept)
 Operator(reflection TS)
(concept)
 ConversionOperator(reflection TS)
(concept)
 Lambda(reflection TS)
(concept)
 LambdaCapture(reflection TS)
(concept)
```

#### Operações de meta-objeto

Definido no cabeçalho `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`
---
Definido no namespace `std::experimental::reflect`

```cpp
Definido no inline namespace `std::experimental::reflect::v1`
```

##### Operações de `Object`

[ reflects_same](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/reflects_same&action=edit&redlink=1> "cpp/experimental/reflect/reflects same \(page does not exist\)")(reflection TS) | verifica se dois tipos de meta-objeto refletem a mesma entidade ou alias
(class template)
[ get_source_line](<#/doc/experimental/reflect/get_source_line>)(reflection TS) | obtém o número de linha presumido da declaração da entidade ou alias refletido
(class template)
[ get_source_column](<#/doc/experimental/reflect/get_source_column>)(reflection TS) | obtém o número de coluna definido pela implementação da declaração da entidade ou alias refletido
(class template)
[ get_source_file_name](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_source_file_name&action=edit&redlink=1> "cpp/experimental/reflect/get source file name \(page does not exist\)")(reflection TS) | obtém o nome de arquivo presumido da declaração da entidade ou alias refletido
(class template)

##### Operações de `ObjectSequence`

[ get_size](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_size&action=edit&redlink=1> "cpp/experimental/reflect/get size \(page does not exist\)")(reflection TS) | obtém o tamanho de uma sequência de meta-objetos
(class template)
[ get_element](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_element&action=edit&redlink=1> "cpp/experimental/reflect/get element \(page does not exist\)")(reflection TS) | obtém o tipo de meta-objeto com o índice especificado em uma sequência
(class template)
[ unpack_sequence](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/unpack_sequence&action=edit&redlink=1> "cpp/experimental/reflect/unpack sequence \(page does not exist\)")(reflection TS) | aplica um template à sequência de meta-objetos
(class template)

##### Operações de `Named`

[ is_unnamed](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_unnamed&action=edit&redlink=1> "cpp/experimental/reflect/is unnamed \(page does not exist\)")(reflection TS) | verifica se a entidade ou alias refletido não tem nome
(class template)
[ get_name](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_name&action=edit&redlink=1> "cpp/experimental/reflect/get name \(page does not exist\)")(reflection TS) | obtém o nome não qualificado da entidade ou alias refletido
(class template)
[ get_display_name](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_display_name&action=edit&redlink=1> "cpp/experimental/reflect/get display name \(page does not exist\)")(reflection TS) | obtém o nome de exibição definido pela implementação da entidade ou alias refletido
(class template)

##### Operações de `Alias`

[ get_alias](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_alias&action=edit&redlink=1> "cpp/experimental/reflect/get alias \(page does not exist\)")(reflection TS) | obtém o tipo de meta-objeto que reflete a entidade associada do alias refletido
(class template)

##### Operações de `Type`

[ get_type](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_type&action=edit&redlink=1> "cpp/experimental/reflect/get type \(page does not exist\)")(reflection TS) | obtém o tipo de meta-objeto que reflete o tipo da entidade ou alias refletido
(class template)
[ get_reflected_type](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_reflected_type&action=edit&redlink=1> "cpp/experimental/reflect/get reflected type \(page does not exist\)")(reflection TS) | obtém o tipo da entidade ou alias refletido
(class template)
[ is_enum](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_enum&action=edit&redlink=1> "cpp/experimental/reflect/is enum \(page does not exist\)")(reflection TS) | verifica se o tipo de meta-objeto reflete um tipo de enumeração
(class template)
[ is_union](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_union&action=edit&redlink=1> "cpp/experimental/reflect/is union \(page does not exist\)")(reflection TS) | verifica se o tipo de meta-objeto reflete um tipo de união
(class template)
[ uses_class_keyuses_struct_key](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/uses_key&action=edit&redlink=1> "cpp/experimental/reflect/uses key \(page does not exist\)")(reflection TS) | verifica se o tipo de meta-objeto reflete um tipo de classe não-união cuja declaração usa class ou struct, respectivamente
(class template)

##### Operações de `ScopeMember`

[ get_scope](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_scope&action=edit&redlink=1> "cpp/experimental/reflect/get scope \(page does not exist\)")(reflection TS) | obtém o tipo de meta-objeto que reflete o escopo da entidade ou alias refletido
(class template)

##### Operações de `Base`

[ get_class](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_class&action=edit&redlink=1> "cpp/experimental/reflect/get class \(page does not exist\)")(reflection TS) | obtém o tipo de meta-objeto que reflete a classe base na relação de classe base fornecida
(class template)

##### Operações de `RecordMember` e `Base`

[ is_public](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_public&action=edit&redlink=1> "cpp/experimental/reflect/is public \(page does not exist\)")(reflection TS) | verifica se o membro ou classe base refletido é público
(class template)
[ is_protected](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_protected&action=edit&redlink=1> "cpp/experimental/reflect/is protected \(page does not exist\)")(reflection TS) | verifica se o membro ou classe base refletido é protegido
(class template)
[ is_private](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_private&action=edit&redlink=1> "cpp/experimental/reflect/is private \(page does not exist\)")(reflection TS) | verifica se o membro ou classe base refletido é privado
(class template)

##### Operações de `Record`

[ get_public_data_membersget_accessible_data_membersget_data_members](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_data_members&action=edit&redlink=1> "cpp/experimental/reflect/get data members \(page does not exist\)")(reflection TS) | obtém um tipo de sequência de meta-objetos cujos elementos refletem membros de dados públicos, acessíveis ou todos os membros de dados da classe refletida
(class template)
[ get_public_member_functionsget_accessible_member_functionsget_member_functions](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_member_functions&action=edit&redlink=1> "cpp/experimental/reflect/get member functions \(page does not exist\)")(reflection TS) | obtém um tipo de sequência de meta-objetos cujos elementos refletem funções membro públicas, acessíveis ou todas as funções membro da classe refletida
(class template)
[ get_constructors](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_constructors&action=edit&redlink=1> "cpp/experimental/reflect/get constructors \(page does not exist\)")(reflection TS) | obtém um tipo de sequência de meta-objetos cujos elementos refletem todos os construtores da classe refletida
(class template)
[ get_operators](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_operators&action=edit&redlink=1> "cpp/experimental/reflect/get operators \(page does not exist\)")(reflection TS) | obtém um tipo de sequência de meta-objetos cujos elementos refletem todas as funções de operador e funções de conversão declaradas na classe refletida
(class template)
[ get_destructor](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_destructor&action=edit&redlink=1> "cpp/experimental/reflect/get destructor \(page does not exist\)")(reflection TS) | obtém o tipo de meta-objeto que reflete o destrutor da classe refletida
(class template)
[ get_public_member_typesget_accessible_member_typesget_member_types](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_member_types&action=edit&redlink=1> "cpp/experimental/reflect/get member types \(page does not exist\)")(reflection TS) | obtém um tipo de sequência de meta-objetos cujos elementos refletem tipos aninhados públicos, acessíveis ou todos os typedefs de membro da classe refletida
(class template)
[ get_public_base_classesget_accessible_base_classesget_base_classes](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_base_classes&action=edit&redlink=1> "cpp/experimental/reflect/get base classes \(page does not exist\)")(reflection TS) | obtém um tipo de sequência de meta-objetos cujos elementos refletem classes base públicas, acessíveis ou todas as classes base da classe refletida
(class template)

##### Operações de `Enum`

[ is_scoped_enum](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_scoped_enum&action=edit&redlink=1> "cpp/experimental/reflect/is scoped enum \(page does not exist\)")(reflection TS) | verifica se a enumeração refletida tem escopo
(class template)
[ get_enumerators](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_enumerators&action=edit&redlink=1> "cpp/experimental/reflect/get enumerators \(page does not exist\)")(reflection TS) | obtém um tipo de sequência de meta-objetos cujos elementos refletem os enumeradores da enumeração refletida
(class template)
[ get_underlying_type](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_underlying_type&action=edit&redlink=1> "cpp/experimental/reflect/get underlying type \(page does not exist\)")(reflection TS) | obtém o tipo de meta-objeto que reflete o tipo subjacente da enumeração refletida
(class template)

##### Operações de `Variable`

[ get_constant](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_constant&action=edit&redlink=1> "cpp/experimental/reflect/get constant \(page does not exist\)")(reflection TS) | obtém o valor da variável refletida que é uma expressão constante
(class template)
[ is_thread_local](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_thread_local&action=edit&redlink=1> "cpp/experimental/reflect/is thread local \(page does not exist\)")(reflection TS) | verifica se a variável é declarada com thread_local
(class template)

##### Operações de `FunctionParameter`

[ has_default_argument](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/has_default_argument&action=edit&redlink=1> "cpp/experimental/reflect/has default argument \(page does not exist\)")(reflection TS) | verifica se o parâmetro refletido tem um argumento padrão
(class template)

##### Operações de `Callable`

[ get_parameters](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_parameters&action=edit&redlink=1> "cpp/experimental/reflect/get parameters \(page does not exist\)")(reflection TS) | obtém um tipo de sequência de meta-objetos cujos elementos refletem os parâmetros da função refletida
(class template)
[ is_vararg](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_vararg&action=edit&redlink=1> "cpp/experimental/reflect/is vararg \(page does not exist\)")(reflection TS) | verifica se a lista de parâmetros da função refletida contém um parâmetro de reticências
(class template)
[ is_noexcept](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_noexcept&action=edit&redlink=1> "cpp/experimental/reflect/is noexcept \(page does not exist\)")(reflection TS) | verifica se a função refletida não lança exceções
(class template)
[ is_deleted](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_deleted&action=edit&redlink=1> "cpp/experimental/reflect/is deleted \(page does not exist\)")(reflection TS) | verifica se a função refletida é deletada
(class template)

##### Operações de `Variable` e `Callable`

[ is_constexpr](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_constexpr&action=edit&redlink=1> "cpp/experimental/reflect/is constexpr \(page does not exist\)")(reflection TS) | verifica se a variável ou função refletida é constexpr
(class template)

##### Operações de `Namespace` e `Callable`

[ is_inline](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_inline&action=edit&redlink=1> "cpp/experimental/reflect/is inline \(page does not exist\)")(reflection TS) | verifica se o namespace ou função refletida é inline
(class template)

##### Operações de `ParenthesizedExpression`

[ get_subexpression](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_subexpression&action=edit&redlink=1> "cpp/experimental/reflect/get subexpression \(page does not exist\)")(reflection TS) | obtém o tipo de meta-objeto que reflete a expressão não-parentesizada da expressão parentesizada refletida
(class template)

##### Operações de `FunctionCallExpression`

[ get_callable](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_callable&action=edit&redlink=1> "cpp/experimental/reflect/get callable \(page does not exist\)")(reflection TS) | obtém o tipo de meta-objeto que reflete a função na function-call-expression refletida
(class template)

##### Operações de `FunctionalTypeConversion`

[ get_constructor](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_constructor&action=edit&redlink=1> "cpp/experimental/reflect/get constructor \(page does not exist\)")(reflection TS) | obtém o tipo de meta-objeto que reflete o construtor na functional-type-conv-expression refletida
(class template)

##### Operações de `Variable` e `Function`

[ get_pointer](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_pointer&action=edit&redlink=1> "cpp/experimental/reflect/get pointer \(page does not exist\)")(reflection TS) | obtém o endereço da variável ou função refletida, ou o valor do ponteiro para membro para o membro não-estático refletido
(class template)

##### Operações de `MemberFunction`

[ is_constis_volatilehas_lvalueref_qualifierhas_rvalueref_qualifier](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_qualified&action=edit&redlink=1> "cpp/experimental/reflect/is qualified \(page does not exist\)")(reflection TS) | verifica se a função membro refletida é declarada com o qualificador const, volatile, &, ou &&, respectivamente
(class template)
[ is_override](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_override&action=edit&redlink=1> "cpp/experimental/reflect/is override \(page does not exist\)")(reflection TS) | verifica se a função membro refletida sobrescreve uma função membro da classe base
(class template)

##### Operações de `Record` e `MemberFunction`

[ is_final](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_final&action=edit&redlink=1> "cpp/experimental/reflect/is final \(page does not exist\)")(reflection TS) | verifica se a classe ou função membro refletida é marcada com final
(class template)

##### Operações de `Variable` e `MemberFunction`

[ is_static](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_static&action=edit&redlink=1> "cpp/experimental/reflect/is static \(page does not exist\)")(reflection TS) | verifica se a variável refletida tem duração de armazenamento estática, ou se a função membro refletida é estática
(class template)

##### Operações de `SpecialMemberFunction`

[ is_implicitly_declared](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_implicitly_declared&action=edit&redlink=1> "cpp/experimental/reflect/is implicitly declared \(page does not exist\)")(reflection TS) | verifica se a função membro especial refletida é implicitamente declarada
(class template)
[ is_defaulted](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_defaulted&action=edit&redlink=1> "cpp/experimental/reflect/is defaulted \(page does not exist\)")(reflection TS) | verifica se a função membro especial refletida é padronizada em sua primeira declaração
(class template)
(modelo de classe)

##### Operações de `Constructor` e `ConversionOperator`

[ `is_explicit`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_explicit&action=edit&redlink=1> "cpp/experimental/reflect/is explicit \(page does not exist\)")(reflection TS) | verifica se o constructor ou função de conversão refletido é declarado com explicit
(modelo de classe)

##### Operações de `MemberFunction` e `Destructor`

[ `is_virtual`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_virtual&action=edit&redlink=1> "cpp/experimental/reflect/is virtual \(page does not exist\)")(reflection TS) | verifica se a função membro refletida é virtual
(modelo de classe)
[ `is_pure_virtual`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_pure_virtual&action=edit&redlink=1> "cpp/experimental/reflect/is pure virtual \(page does not exist\)")(reflection TS) | verifica se a função membro refletida é pure virtual
(modelo de classe)

##### Operações de `Lambda`

[ `get_captures`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_captures&action=edit&redlink=1> "cpp/experimental/reflect/get captures \(page does not exist\)")(reflection TS) | obtém um tipo de sequência de meta-objetos cujos elementos refletem as capturas do tipo de closure refletido
(modelo de classe)
[ `uses_default_copy_captureuses_default_reference_capture`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/uses_default_capture&action=edit&redlink=1> "cpp/experimental/reflect/uses default capture \(page does not exist\)")(reflection TS) | verifica se o capture-default da expressão lambda do tipo de closure refletido é `=` ou `&` respectivamente
(modelo de classe)
[ `is_call_operator_const`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_call_operator_const&action=edit&redlink=1> "cpp/experimental/reflect/is call operator const \(page does not exist\)")(reflection TS) | verifica se o `operator()` do tipo de closure refletido é declarado com const
(modelo de classe)

##### Operações de `LambdaCapture`

[ `is_explictly_captured`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_explictly_captured&action=edit&redlink=1> "cpp/experimental/reflect/is explictly captured \(page does not exist\)")(reflection TS) | verifica se a captura lambda refletida é explicitamente capturada
(modelo de classe)
[ `is_init_capture`](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_init_capture&action=edit&redlink=1> "cpp/experimental/reflect/is init capture \(page does not exist\)")(reflection TS) | verifica se a captura lambda refletida é uma init-capture
(modelo de classe)

#### Macros de teste de recursos da biblioteca

Definido no header `[<experimental/reflect>](<#/doc/header/experimental/reflect>)`
---
`__cpp_lib_reflection`(reflection TS) | um valor de pelo menos 201902 indica que a biblioteca de suporte do Reflection TS é suportada
(macro constante)

#### Satisfação de concepts

A tabela a seguir lista se um tipo de meta-objeto que reflete um operando satisfaz os concepts introduzidos pelo Reflection TS.

Categoria | operandos `reflexpr` | Concepts Satisfeitos
---|---|---
Type | nome de classe que designa uma [union](<#/doc/language/union>) | `reflect::Union`
 | nome de classe que designa um [closure type](<#/doc/language/lambda>) | `reflect::Lambda`
 | nome de classe que designa uma classe não-union | `reflect::Record`
 | [nome de enum](<#/doc/language/enum>) | `reflect::Enum`
 | [parâmetro de tipo de template](<#/doc/language/template_parameters>) | `reflect::Type`, `reflect::Alias`
 | [especificador decltype](<#/doc/language/decltype>) | `reflect::Type`, `reflect::Alias`
 | nome de tipo introduzido por uma [using-declaration](<#/doc/language/namespace>) | `reflect::Type`, `reflect::Alias`, `reflect::ScopedMember`
 | qualquer outro nome de typedef | `reflect::Type`, `reflect::Alias`
 | qualquer outro type-id | `reflect::Type`
Namespace | [alias de namespace](<#/doc/language/namespace_alias>) | `reflect::Namespace`, `reflect::Alias`
 | o namespace global | `reflect::GlobalScope`
 | qualquer outro [namespace](<#/doc/language/namespace>) | `reflect::Namespace`
Expression | o nome de um membro de dados | `reflect::Variable`
 | o nome de uma variável | `reflect::Variable`
 | o nome de um enumerador | `reflect::Enumerator`
 | o nome de um parâmetro de função | `reflect::FunctionParameter`
 | o nome de uma [entidade capturada](<#/doc/language/lambda>) | `reflect::LambdaCapture`
 | expressão entre parênteses | `reflect::ParenthesizedExpression`
 | expressão de chamada de função | `reflect::FunctionCallExpression`
 | expressão de conversão de tipo funcional | `reflect::FunctionalTypeConversion`

Se o operando da forma id-expression for uma expressão constante, o tipo especificado pelo reflexpr-specifier também satisfaz `reflect::Constant`.

Se o reflexpr-operand designar um membro de classe, o tipo representado pelo reflexpr-specifier também satisfaz `reflect::RecordMember`.

### Veja também

[ `type_info`](<#/doc/types/type_info>) | contém informações de algum tipo, a classe retornada pelo operador typeid
(classe)
[ `<type_traits>`](<#/doc/header/type_traits>)(C++11) | [Utilitários de informação de tipo em tempo de compilação](<#/doc/types>)