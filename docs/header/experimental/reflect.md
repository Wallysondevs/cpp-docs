# Cabeçalho da biblioteca experimental &lt;experimental/reflect&gt;

Este cabeçalho faz parte da [Reflection TS](<#/doc/experimental/reflect>).

Definido no namespace `std::experimental::reflect`  
---  
Definido no inline namespace `std::experimental::reflect::v1`  
  
### Conceitos  
  
[ Object](<#/doc/experimental/reflect/Object>)(reflection TS) | especifica que um tipo é um tipo de meta-objeto   
(concept)  
[ ObjectSequence](<#/doc/experimental/reflect/ObjectSequence>)(reflection TS) | especifica que um tipo de meta-objeto é um tipo de sequência de meta-objetos   
(concept)  
[ TemplateParameterScope](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/TemplateParameterScope&action=edit&redlink=1> "cpp/experimental/reflect/TemplateParameterScope \(page does not exist\)")(reflection TS) | especifica que um tipo de meta-objeto reflete um escopo de parâmetro de template   
(concept)  
[ Named](<#/doc/experimental/reflect/Named>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma entidade ou alias com um nome associado (possivelmente vazio)   
(concept)  
[ Alias](<#/doc/experimental/reflect/Alias>)(reflection TS) | especifica que um tipo de meta-objeto reflete um alias de tipo, alias de namespace, ou um alias introduzido por uma using-declaration   
(concept)  
[ RecordMember](<#/doc/experimental/reflect/RecordMember>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma member-declaration de uma classe   
(concept)  
[ Enumerator](<#/doc/experimental/reflect/Enumerator>)(reflection TS) | especifica que um tipo de meta-objeto reflete um enumerador   
(concept)  
[ Variable](<#/doc/experimental/reflect/Variable>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma variável ou membro de dados   
(concept)  
[ ScopeMember](<#/doc/experimental/reflect/ScopeMember>)(reflection TS) | especifica que um tipo de meta-objeto satisfaz `RecordMember`, `Enumerator`, ou `Variable`, ou reflete um namespace diferente do namespace global   
(concept)  
[ Typed](<#/doc/experimental/reflect/Typed>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma entidade com um tipo   
(concept)  
[ Namespace](<#/doc/experimental/reflect/Namespace>)(reflection TS) | especifica que um tipo de meta-objeto reflete um namespace   
(concept)  
[ GlobalScope](<#/doc/experimental/reflect/GlobalScope>)(reflection TS) | especifica que um tipo de meta-objeto reflete o namespace global   
(concept)  
[ Class](<#/doc/experimental/reflect/Class>)(reflection TS) | especifica que um tipo de meta-objeto reflete um tipo de classe não-união   
(concept)  
[ Enum](<#/doc/experimental/reflect/Enum>)(reflection TS) | especifica que um tipo de meta-objeto reflete um tipo de enumeração   
(concept)  
[ Record](<#/doc/experimental/reflect/Record>)(reflection TS) | especifica que um tipo de meta-objeto reflete um tipo de classe   
(concept)  
[ Scope](<#/doc/experimental/reflect/Scope>)(reflection TS) | especifica que um tipo de meta-objeto reflete um namespace, classe, enumeração, função, tipo de closure, um escopo de parâmetro de template   
(concept)  
[ Type](<#/doc/experimental/reflect/Type>)(reflection TS) | especifica que um tipo de meta-objeto reflete um tipo   
(concept)  
[ Constant](<#/doc/experimental/reflect/Constant>)(reflection TS) | especifica que um tipo de meta-objeto reflete um enumerador ou uma variável constexpr   
(concept)  
[ Base](<#/doc/experimental/reflect/Base>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma classe base direta obtida de `get_base_classes`   
(concept)  
[ FunctionParameter](<#/doc/experimental/reflect/FunctionParameter>)(reflection TS) | especifica que um tipo de meta-objeto reflete um parâmetro de função   
(concept)  
[ Callable](<#/doc/experimental/reflect/Callable>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma função (incluindo construtores e destrutores)   
(concept)  
[ Expression](<#/doc/experimental/reflect/Expression>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma expressão   
(concept)  
[ ParenthesizedExpression](<#/doc/experimental/reflect/ParenthesizedExpression>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma expressão entre parênteses   
(concept)  
[ FunctionCallExpression](<#/doc/experimental/reflect/FunctionCallExpression>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma function-call-expression   
(concept)  
[ FunctionalTypeConversion](<#/doc/experimental/reflect/FunctionalTypeConversion>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma functional-type-conv-expression   
(concept)  
[ Function](<#/doc/experimental/reflect/Function>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma função (excluindo construtores e destrutores)   
(concept)  
[ MemberFunction](<#/doc/experimental/reflect/MemberFunction>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma função membro (excluindo construtores e destrutores)   
(concept)  
[ SpecialMemberFunction](<#/doc/experimental/reflect/SpecialMemberFunction>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma função membro especial   
(concept)  
[ Constructor](<#/doc/experimental/reflect/Constructor>)(reflection TS) | especifica que um tipo de meta-objeto reflete um construtor   
(concept)  
[ Destructor](<#/doc/experimental/reflect/Destructor>)(reflection TS) | especifica que um tipo de meta-objeto reflete um destrutor   
(concept)  
[ Operator](<#/doc/experimental/reflect/Operator>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma função de operador ou uma função de conversão   
(concept)  
[ ConversionOperator](<#/doc/experimental/reflect/ConversionOperator>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma função de conversão   
(concept)  
[ Lambda](<#/doc/experimental/reflect/Lambda>)(reflection TS) | especifica que um tipo de meta-objeto reflete o tipo de closure de uma lambda não-genérica   
(concept)  
[ LambdaCapture](<#/doc/experimental/reflect/LambdaCapture>)(reflection TS) | especifica que um tipo de meta-objeto reflete uma captura de lambda   
(concept)  
  
### Classes  
  
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
  
[ is_unnamed](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_unnamed&action=edit&redlink=1> "cpp/experimental/reflect/is unnamed \(page does not exist\)")(reflection TS) | verifica se a entidade ou alias refletido é nomeado   
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
  
[ is_scoped_enum](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_scoped_enum&action=edit&redlink=1> "cpp/experimental/reflect/is scoped enum \(page does not exist\)")(reflection TS) | verifica se a enumeração refletida é scoped   
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
  
[ has_default_argument](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/has_default_argument&action=edit&redlink=1> "cpp/experimental/reflect/has default argument \(page does not exist\)")(reflection TS) | verifica se o parâmetro refletido possui um argumento padrão   
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
  
[ is_static](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_static&action=edit&redlink=1> "cpp/experimental/reflect/is static \(page does not exist\)")(reflection TS) | verifica se a variável refletida é de duração de armazenamento estática, ou se a função membro refletida é estática   
(class template)  
  
##### Operações de `SpecialMemberFunction`   
  
[ is_implicitly_declared](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_implicitly_declared&action=edit&redlink=1> "cpp/experimental/reflect/is implicitly declared \(page does not exist\)")(reflection TS) | verifica se a função membro especial refletida é implicitamente declarada   
(class template)  
[ is_defaulted](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_defaulted&action=edit&redlink=1> "cpp/experimental/reflect/is defaulted \(page does not exist\)")(reflection TS) | verifica se a função membro especial refletida é defaulted em sua primeira declaração   
(class template)  
  
##### Operações de `Constructor` e `ConversionOperator`   
  
[ is_explicit](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_explicit&action=edit&redlink=1> "cpp/experimental/reflect/is explicit \(page does not exist\)")(reflection TS) | verifica se o construtor ou função de conversão refletida é declarada com explicit   
(class template)  
  
##### Operações de `MemberFunction` e `Destructor`   
  
[ is_virtual](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_virtual&action=edit&redlink=1> "cpp/experimental/reflect/is virtual \(page does not exist\)")(reflection TS) | verifica se a função membro refletida é virtual   
(class template)  
[ is_pure_virtual](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_pure_virtual&action=edit&redlink=1> "cpp/experimental/reflect/is pure virtual \(page does not exist\)")(reflection TS) | verifica se a função membro refletida é puramente virtual   
(class template)  
  
##### Operações de `Lambda`   
  
[ get_captures](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/get_captures&action=edit&redlink=1> "cpp/experimental/reflect/get captures \(page does not exist\)")(reflection TS) | obtém um tipo de sequência de meta-objetos cujos elementos refletem as capturas do tipo de closure refletido   
(class template)  
[ uses_default_copy_captureuses_default_reference_capture](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/uses_default_capture&action=edit&redlink=1> "cpp/experimental/reflect/uses default capture \(page does not exist\)")(reflection TS) | verifica se o capture-default da expressão lambda do tipo de closure refletido é `=` ou `&`, respectivamente   
(class template)  
[ is_call_operator_const](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_call_operator_const&action=edit&redlink=1> "cpp/experimental/reflect/is call operator const \(page does not exist\)")(reflection TS) | verifica se o `operator()` do tipo de closure refletido é declarado com const   
(class template)  
  
##### Operações de `LambdaCapture`   
  
[ is_explictly_captured](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_explictly_captured&action=edit&redlink=1> "cpp/experimental/reflect/is explictly captured \(page does not exist\)")(reflection TS) | verifica se a captura de lambda refletida é explicitamente capturada   
(class template)  
[ is_init_capture](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/reflect/is_init_capture&action=edit&redlink=1> "cpp/experimental/reflect/is init capture \(page does not exist\)")(reflection TS) | verifica se a captura de lambda refletida é uma init-capture   
(class template)  
  
### Sinopse
```cpp
    namespace std::experimental::reflect {
    inline namespace v1 {
     
    // 21.12.3 Conceitos para tipos de meta-objeto
    template <class T>
    concept Object = /* see description */;
    template <class T>
    concept ObjectSequence = /* see description */; // refines Object
    template <class T>
    concept TemplateParameterScope = /* see description */; // refines Scope
    template <class T>
    concept Named = /* see description */;          // refines Object
    template <class T>
    concept Alias = /* see description */;          // refines Named and ScopeMember
    template <class T>
    concept RecordMember = /* see description */;   // refines ScopeMember
    template <class T>
    concept Enumerator = /* see description */;     // refines Constant
    template <class T>
    concept Variable = /* see description */;       // refines Typed and ScopeMember
    template <class T>
    concept ScopeMember = /* see description */;    // refines Named
    template <class T>
    concept Typed = /* see description */;          // refines Object
    template <class T>
    concept Namespace = /* see description */;      // refines Named and Scope
    template <class T>
    concept GlobalScope = /* see description */;    // refines Namespace
    template <class T>
    concept Class = /* see description */;          // refines Record
    template <class T>
    concept Enum = /* see description */;           // refines Type, Scope, and ScopeMember
    template <class T>
    concept Record = /* see description */;         // refines Type, Scope, and ScopeMember
    template <class T>
    concept Scope = /* see description */;          // refines Object
    template <class T>
    concept Type = /* see description */;           // refines Named
    template <class T>
    concept Constant = /* see description */;       // refines Typed and ScopeMember
    template <class T>
    concept Base = /* see description */;           // refines Object
    template <class T>
    concept FunctionParameter = /* see description */; // refines Typed and ScopeMember
    template <class T>
    concept Callable = /* see description */;       // refines Scope and ScopeMember
    template <class T>
    concept Expression = /* see description */;     // refines Object
    template <class T>
    concept ParenthesizedExpression = /* see description */; // refines Expression
    template <class T>
    concept FunctionCallExpression = /* see description */; // refines Expression
    template <class T>
    concept FunctionalTypeConversion = /* see description */; // refines Expression
    template <class T>
    concept Function = /* see description */;       // refines Typed and Callable
    template <class T>
    concept MemberFunction = /* see description */; // refines RecordMember and Function
    template <class T>
    concept SpecialMemberFunction = /* see description */; // refines RecordMember
    template <class T>
    concept Constructor = /* see description */;    // refines Callable and RecordMember
    template <class T>
    concept Destructor = /* see description */;     // refines Callable and SpecialMemberFunction
    template <class T>
    concept Operator = /* see description */;       // refines Function
    template <class T>
    concept ConversionOperator = /* see description */; // refines MemberFunction and Operator
    template <class T>
    concept Lambda = /* see description */;         // refines Type and Scope
    template <class T>
    concept LambdaCapture = /* see description */;  // refines Variable
     
    // 21.12.4 Operações de meta-objeto
    // Operações multi-conceito
    template <Object T> struct is_public;
    template <Object T> struct is_protected;
    template <Object T> struct is_private;
    template <Object T> struct is_constexpr;
    template <Object T> struct is_static;
    template <Object T> struct is_final;
    template <Object T> struct is_explicit;
    template <Object T> struct is_inline;
    template <Object T> struct is_virtual;
    template <Object T> struct is_pure_virtual;
    template <Object T> struct get_pointer;
     
    template <class T>
    requires RecordMember<T> || Base<T>
      constexpr auto is_public_v = is_public<T>::value;
    template <class T>
    requires RecordMember<T> || Base<T>
      constexpr auto is_protected_v = is_protected<T>::value;
    template <class T>
    requires RecordMember<T> || Base<T>
      constexpr auto is_private_v = is_private<T>::value;
    template <class T>
    requires Variable<T> || Callable<T>
      constexpr auto is_constexpr_v = is_constexpr<T>::value;
    template <class T>
    requires Variable<T> || MemberFunction<T>
      constexpr auto is_static_v = is_static<T>::value;
    template <class T>
    requires Class<T> || MemberFunction<T>
      constexpr auto is_final_v = is_final<T>::value;
    template <class T>
    requires Constructor<T> || ConversionOperator<T>
      constexpr auto is_explicit_v = is_explicit<T>::value;
    template <class T>
    requires Namespace<T> || Callable<T>
```
```cpp
      constexpr auto is_inline_v = is_inline<T>::value;
    template <class T>
    requires Base<T> || MemberFunction<T> || Destructor<T>
      constexpr auto is_virtual_v = is_virtual<T>::value;
    template <class T>
    requires MemberFunction<T> || Destructor<T>
      constexpr auto is_pure_virtual_v = is_pure_virtual<T>::value;
    template <class T>
    requires Variable<T> || Function<T>
      constexpr auto get_pointer_v = get_pointer<T>::value;
     
    // 21.12.4.1 Object operations
    template <Object T1, Object T2> struct reflects_same;
    template <Object T> struct get_source_line;
    template <Object T> struct get_source_column;
    template <Object T> struct get_source_file_name;
     
    template <Object T1, Object T2>
      constexpr auto reflects_same_v = reflects_same<T1, T2>::value;
    template <class T>
      constexpr auto get_source_line_v = get_source_line<T>::value;
    template <class T>
      constexpr auto get_source_column_v = get_source_column<T>::value;
    template <class T>
      constexpr auto get_source_file_name_v = get_source_file_name<T>::value;
     
    // 21.12.4.2 ObjectSequence operations
    template <ObjectSequence T> struct get_size;
    template <size_t I, ObjectSequence T> struct get_element;
    template <template <class...> class Tpl, ObjectSequence T>
      struct unpack_sequence;
     
    template <ObjectSequence T>
      constexpr auto get_size_v = get_size<T>::value;
    template <size_t I, ObjectSequence T>
      using get_element_t = typename get_element<I, T>::type;
    template <template <class...> class Tpl, ObjectSequence T>
      using unpack_sequence_t = typename unpack_sequence<Tpl, T>::type;
     
    // 21.12.4.3 Named operations
    template <Named T> struct is_unnamed;
    template <Named T> struct get_name;
    template <Named T> struct get_display_name;
     
    template <Named T>
      constexpr auto is_unnamed_v = is_unnamed<T>::value;
    template <Named T>
      constexpr auto get_name_v = get_name<T>::value;
    template <Named T>
      constexpr auto get_display_name_v = get_display_name<T>::value;
     
    // 21.12.4.4 Alias operations
    template <Alias T> struct get_aliased;
     
    template <Alias T>
      using get_aliased_t = typename get_aliased<T>::type;
     
    // 21.12.4.5 Type operations
    template <Typed T> struct get_type;
    template <Type T> struct get_reflected_type;
    template <Type T> struct is_enum;
    template <Class T> struct uses_class_key;
    template <Class T> struct uses_struct_key;
    template <Type T> struct is_union;
     
    template <Typed T>
      using get_type_t = typename get_type<T>::type;
    template <Type T>
      using get_reflected_type_t = typename get_reflected_type<T>::type;
    template <Type T>
      constexpr auto is_enum_v = is_enum<T>::value;
    template <Class T>
      constexpr auto uses_class_key_v = uses_class_key<T>::value;
    template <Class T>
      constexpr auto uses_struct_key_v = uses_struct_key<T>::value;
    template <Type T>
      constexpr auto is_union_v = is_union<T>::value;
     
    // 21.12.4.6 Member operations
    template <ScopeMember T> struct get_scope;
    template <RecordMember T> struct is_public<T>;
    template <RecordMember T> struct is_protected<T>;
    template <RecordMember T> struct is_private<T>;
    template <ScopeMember T>
      using get_scope_t = typename get_scope<T>::type;
     
    // 21.12.4.7 Record operations
    template <Record T> struct get_public_data_members;
    template <Record T> struct get_accessible_data_members;
    template <Record T> struct get_data_members;
    template <Record T> struct get_public_member_functions;
    template <Record T> struct get_accessible_member_functions;
    template <Record T> struct get_member_functions;
    template <Record T> struct get_public_member_types;
    template <Record T> struct get_accessible_member_types;
    template <Record T> struct get_member_types;
    template <Record T> struct get_constructors;
    template <Record T> struct get_destructor;
    template <Record T> struct get_operators;
    template <Class T> struct get_public_base_classes;
    template <Class T> struct get_accessible_base_classes;
    template <Class T> struct get_base_classes;
    template <Class T> struct is_final<T>;
     
    template <Record T>
      using get_public_data_members_t = typename get_public_data_members<T>::type;
    template <Record T>
      using get_accessible_data_members_t = typename get_accessible_data_members<T>::type;
    template <Record T>
      using get_data_members_t = typename get_data_members<T>::type;
    template <Record T>
      using get_public_member_functions_t = typename get_public_member_functions<T>::type;
    template <Record T>
      using get_accessible_member_functions_t = typename get_accessible_member_functions<T>::type;
    template <Record T>
      using get_member_functions_t = typename get_member_functions<T>::type;
    template <Record T>
      using get_public_member_types_t = typename get_public_member_types<T>::type;
    template <Record T>
      using get_accessible_member_types_t = typename get_accessible_member_types<T>::type;
    template <Record T>
      using get_member_types_t = typename get_member_types<T>::type;
    template <Record T>
      using get_constructors_t = typename get_constructors<T>::type;
    template <Record T>
      using get_destructor_t = typename get_destructor<T>::type;
    template <Record T>
      using get_operators_t = typename get_operators<T>::type;
    template <Class T>
      using get_public_base_classes_t = typename get_public_base_classes<T>::type;
    template <Class T>
      using get_accessible_base_classes_t = typename get_accessible_base_classes<T>::type;
    template <Class T>
      using get_base_classes_t = typename get_base_classes<T>::type;
     
    // 21.12.4.8 Enum operations
    template <Enum T> struct is_scoped_enum;
    template <Enum T> struct get_enumerators;
    template <Enum T> struct get_underlying_type;
     
    template <Enum T>
      constexpr auto is_scoped_enum_v = is_scoped_enum<T>::value;
    template <Enum T>
      using get_enumerators_t = typename get_enumerators<T>::type;
    template <Enum T>
      using get_underlying_type_t = typename get_underlying_type<T>::type;
     
    // 21.12.4.9 Value operations
    template <Constant T> struct get_constant;
    template <Variable T> struct is_constexpr<T>;
    template <Variable T> struct is_static<T>;
    template <Variable T> struct is_thread_local;
    template <Variable T> struct get_pointer<T>;
     
    template <Constant T>
      constexpr auto get_constant_v = get_constant<T>::value;
    template <Variable T>
      constexpr auto is_thread_local_v = is_thread_local<T>::value;
     
    // 21.12.4.10 Base operations
    template <Base T> struct get_class;
    template <Base T> struct is_virtual<T>;
    template <Base T> struct is_public<T>;
    template <Base T> struct is_protected<T>;
    template <Base T> struct is_private<T>;
     
    template <Base T>
      using get_class_t = typename get_class<T>::type;
     
    // 21.12.4.11 Namespace operations
    template <Namespace T> struct is_inline<T>;
     
    // 21.12.4.12 FunctionParameter operations
    template <FunctionParameter T> struct has_default_argument;
     
    template <FunctionParameter T>
      constexpr auto has_default_argument_v = has_default_argument<T>::value;
     
    // 21.12.4.13 Callable operations
    template <Callable T> struct get_parameters;
    template <Callable T> struct is_vararg;
    template <Callable T> struct is_constexpr<T>;
    template <Callable T> struct is_noexcept;
    template <Callable T> struct is_inline<T>;
    template <Callable T> struct is_deleted;
     
    template <Callable T>
      using get_parameters_t = typename get_parameters<T>::type;
    template <Callable T>
      constexpr auto is_vararg_v = is_vararg<T>::value;
    template <Callable T>
      constexpr auto is_deleted_v = is_deleted<T>::value;
     
    // 21.12.4.14 ParenthesizedExpression operations
    template <ParenthesizedExpression T> struct get_subexpression;
     
    template <ParenthesizedExpression T>
      using get_subexpression_t = typename get_subexpression<T>::type;
     
    // 21.12.4.15 FunctionCallExpression operations
    template <FunctionCallExpression T> struct get_callable;
     
    template <FunctionCallExpression T>
      using get_callable_t = typename get_callable<T>::type;
     
    // 21.12.4.16 FunctionalTypeConversion operations
    template <FunctionalTypeConversion T> struct get_constructor;
     
    template <FunctionalTypeConversion T>
      using get_constructor_t = typename get_constructor<T>::type;
     
    // 21.12.4.17 Function operations
    template <Function T> struct get_pointer<T>;
     
    // 21.12.4.18 MemberFunction operations
    template <MemberFunction T> struct is_static<T>;
    template <MemberFunction T> struct is_const;
    template <MemberFunction T> struct is_volatile;
    template <MemberFunction T> struct has_lvalueref_qualifier;
    template <MemberFunction T> struct has_rvalueref_qualifier;
    template <MemberFunction T> struct is_virtual<T>;
    template <MemberFunction T> struct is_pure_virtual<T>;
    template <MemberFunction T> struct is_override;
    template <MemberFunction T> struct is_final<T>;
     
    template <MemberFunction T>
      constexpr auto is_const_v = is_const<T>::value;
    template <MemberFunction T>
      constexpr auto is_volatile_v = is_volatile<T>::value;
    template <MemberFunction T>
      constexpr auto has_lvalueref_qualifier_v = has_lvalueref_qualifier<T>::value;
    template <MemberFunction T>
      constexpr auto has_rvalueref_qualifier_v = has_rvalueref_qualifier<T>::value;
    template <MemberFunction T>
      constexpr auto is_override_v = is_override<T>::value;
     
    // 21.12.4.19 SpecialMemberFunction operations
    template <SpecialMemberFunction T> struct is_implicitly_declared;
    template <SpecialMemberFunction T> struct is_defaulted;
     
    template <SpecialMemberFunction T>
      constexpr auto is_implicitly_declared_v = is_implicitly_declared<T>::value;
    template <SpecialMemberFunction T>
      constexpr auto is_defaulted_v = is_defaulted<T>::value;
     
    // 21.12.4.20 Constructor operations
    template <Constructor T> struct is_explicit<T>;
     
    // 21.12.4.21 Destructor operations
    template <Destructor T> struct is_virtual<T>;
    template <Destructor T> struct is_pure_virtual<T>;
     
    // 21.12.4.22 ConversionOperator operations
    template <ConversionOperator T> struct is_explicit<T>;
     
    // 21.12.4.23 Lambda operations
    template <Lambda T> struct get_captures;
    template <Lambda T> struct uses_default_copy_capture;
    template <Lambda T> struct uses_default_reference_capture;
    template <Lambda T> struct is_call_operator_const;
     
    template <Lambda T>
      using get_captures_t = typename get_captures<T>::type;
    template <Lambda T>
      constexpr auto uses_default_copy_capture_v = uses_default_copy_capture<T>::value;
    template <Lambda T>
      constexpr auto uses_default_reference_capture_v = uses_default_reference_capture<T>::value;
    template <Lambda T>
      constexpr auto is_call_operator_const_v = is_call_operator_const<T>::value;
     
    // 21.12.4.24 LambdaCapture operations
    template <LambdaCapture T> struct is_explicitly_captured;
    template <LambdaCapture T> struct is_init_capture;
     
    template <LambdaCapture T>
      constexpr auto is_explicitly_captured_v = is_explicitly_captured<T>::value;
    template <LambdaCapture T>
      constexpr auto is_init_capture_v = is_init_capture<T>::value;
     
    } // inline namespace v1
    } // namespace std::experimental::reflect
```