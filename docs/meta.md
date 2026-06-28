# Biblioteca de metaprogramação (desde C++11)

C++ oferece facilidades de metaprogramação, como type traits, aritmética racional em tempo de compilação e sequências de inteiros em tempo de compilação.
  
### Definições

Os seguintes tipos são coletivamente chamados de _tipos referenciáveis_: 

  * [tipos de objeto](<#/doc/language/type-id>)
  * [tipos de função](<#/doc/language/function>) sem cv e ref
  * [tipos de referência](<#/doc/language/reference>)

Para qualquer tipo referenciável `T`, uma referência a ele pode ser criada[1](<#/doc/meta>). 

  1. [↑](<#/doc/meta>) Para tipos de referência, isso pode ser feito via [colapso de referência](<#/doc/language/reference>).

### Type traits

Type traits definem interfaces baseadas em template em tempo de compilação para consultar as propriedades dos tipos. 

Tentar especializar um template definido no header [`<type_traits>`](<#/doc/header/type_traits>) e listado nesta página resulta em comportamento indefinido, exceto que [std::common_type](<#/doc/types/common_type>) e [`std::basic_common_reference`](<#/doc/types/common_reference>)(desde C++20) podem ser especializados conforme exigido na descrição. 

Um template definido no header [`<type_traits>`](<#/doc/header/type_traits>) pode ser instanciado com um tipo incompleto, a menos que especificado de outra forma, não obstante a proibição geral de instanciar templates da standard library com tipos incompletos. 

#### Classes base

A maioria dos type traits não transformadores precisa ser pública e inequivocamente derivada de [std::integral_constant](<#/doc/types/integral_constant>) para satisfazer os requisitos de [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>) ou [BinaryTypeTrait](<#/doc/named_req/BinaryTypeTrait>). 

Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  
---  
[ integral_constantbool_constant](<#/doc/types/integral_constant>)(desde C++11)(desde C++17) | constante em tempo de compilação de tipo especificado com valor especificado   
(class template)  
  
Duas especializações de [std::integral_constant](<#/doc/types/integral_constant>) para o tipo bool são fornecidas: 

Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  
---  
Tipo  |  Definição   
---|---
`true_type` |  [std::integral_constant](<#/doc/types/integral_constant>)<bool, true>  
`false_type` |  [std::integral_constant](<#/doc/types/integral_constant>)<bool, false>  
  
#### Unary type traits

Unary type traits podem ser usados para consultar as propriedades booleanas de um tipo em tempo de compilação. 

Todos esses type traits satisfazem [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>), a característica base de cada type trait é [std::true_type](<#/doc/types/integral_constant>) ou [std::false_type](<#/doc/types/integral_constant>), dependendo se a condição correspondente é satisfeita. 

#####  Categorias de tipos primários   
  
---  
Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  

```cpp
 is_void(desde C++11)
(class template)
 is_null_pointer(desde C++11)(DR*)
(class template)
 is_integral(desde C++11)
(class template)
 is_floating_point(desde C++11)
(class template)
 is_array(desde C++11)
(class template)
 is_enum(desde C++11)
(class template)
 is_union(desde C++11)
(class template)
 is_class(desde C++11)
(class template)
 is_function(desde C++11)
(class template)
 is_pointer(desde C++11)
(class template)
 is_lvalue_reference(desde C++11)
(class template)
 is_rvalue_reference(desde C++11)
(class template)
 is_member_object_pointer(desde C++11)
(class template)
 is_member_function_pointer(desde C++11)
(class template)
```

  
#####  Categorias de tipos compostos   
  
Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  

```cpp
 is_fundamental(desde C++11)
(class template)
 is_arithmetic(desde C++11)
(class template)
 is_scalar(desde C++11)
(class template)
 is_object(desde C++11)
(class template)
 is_compound(desde C++11)
(class template)
 is_reference(desde C++11)
(class template)
 is_member_pointer(desde C++11)
(class template)
```

  
#####  Propriedades de tipo   
  
Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  

```cpp
 is_const(desde C++11)
(class template)
 is_volatile(desde C++11)
(class template)
 is_trivial(desde C++11)(obsoleto desde C++26)
(class template)
 is_trivially_copyable(desde C++11)
(class template)
 is_standard_layout(desde C++11)
(class template)
 is_pod(desde C++11)(obsoleto desde C++20)
(class template)
 is_literal_type(desde C++11)(obsoleto desde C++17)(removido em C++20)
(class template)
 has_unique_object_representations(desde C++17)
(class template)
 is_empty(desde C++11)
(class template)
 is_polymorphic(desde C++11)
(class template)
 is_abstract(desde C++11)
(class template)
 is_final(desde C++14)
(class template)
 is_aggregate(desde C++17)
(class template)
 is_implicit_lifetime(desde C++23)
(class template)
 is_signed(desde C++11)
(class template)
 is_unsigned(desde C++11)
(class template)
 is_bounded_array(desde C++20)
(class template)
 is_unbounded_array(desde C++20)
(class template)
 is_scoped_enum(desde C++23)
(class template)
```

  
#####  Operações suportadas   
  
---  
Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  

```cpp
 is_constructibleis_trivially_constructibleis_nothrow_constructible(desde C++11)(desde C++11)(desde C++11)
(class template)
 is_default_constructibleis_trivially_default_constructibleis_nothrow_default_constructible(desde C++11)(desde C++11)(desde C++11)
(class template)
 is_copy_constructibleis_trivially_copy_constructibleis_nothrow_copy_constructible(desde C++11)(desde C++11)(desde C++11)
(class template)
 is_move_constructibleis_trivially_move_constructibleis_nothrow_move_constructible(desde C++11)(desde C++11)(desde C++11)
(class template)
 is_assignableis_trivially_assignableis_nothrow_assignable(desde C++11)(desde C++11)(desde C++11)
(class template)
 is_copy_assignableis_trivially_copy_assignableis_nothrow_copy_assignable(desde C++11)(desde C++11)(desde C++11)
(class template)
 is_move_assignableis_trivially_move_assignableis_nothrow_move_assignable(desde C++11)(desde C++11)(desde C++11)
(class template)
 is_destructibleis_trivially_destructibleis_nothrow_destructible(desde C++11)(desde C++11)(desde C++11)
(class template)
 has_virtual_destructor(desde C++11)
(class template)
 is_swappable_withis_swappableis_nothrow_swappable_withis_nothrow_swappable(desde C++17)(desde C++17)(desde C++17)(desde C++17)
(class template)
 reference_constructs_from_temporary(desde C++23)
(class template)
 reference_converts_from_temporary(desde C++23)
(class template)
```

  
#### Consultas de propriedade

Property query traits podem ser usados para consultar as propriedades integrais de um tipo em tempo de compilação. 

Todos esses type traits satisfazem [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>), a característica base de cada type trait é [std::integral_constant](<#/doc/types/integral_constant>)<[std::size_t](<#/doc/types/size_t>), Value>, onde `Value` é o resultado da consulta da propriedade correspondente. 

Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  
---  
[ alignment_of](<#/doc/types/alignment_of>)(desde C++11) | obtém os requisitos de alinhamento do tipo   
(class template)  
[ rank](<#/doc/types/rank>)(desde C++11) | obtém o número de dimensões de um tipo array   
(class template)  
[ extent](<#/doc/types/extent>)(desde C++11) | obtém o tamanho de um tipo array ao longo de uma dimensão especificada   
(class template)  
  
#### Relações de tipo

Type relationship traits podem ser usados para consultar relações entre tipos em tempo de compilação. 

Todos esses type traits satisfazem [BinaryTypeTrait](<#/doc/named_req/BinaryTypeTrait>), a característica base de cada type trait é [std::true_type](<#/doc/types/integral_constant>) ou [std::false_type](<#/doc/types/integral_constant>), dependendo se a condição correspondente é satisfeita. 

Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  
---  
[ is_same](<#/doc/types/is_same>)(desde C++11) | verifica se dois tipos são o mesmo   
(class template)  
[ is_base_of](<#/doc/types/is_base_of>)(desde C++11) | verifica se um tipo é uma base do outro tipo   
(class template)  
[ is_virtual_base_of](<#/doc/types/is_virtual_base_of>)(desde C++26) | verifica se um tipo é uma base virtual do outro tipo   
(class template)  
[ is_convertibleis_nothrow_convertible](<#/doc/types/is_convertible>)(desde C++11)(desde C++20) | verifica se um tipo pode ser convertido para o outro tipo   
(class template)  
[ is_layout_compatible](<#/doc/types/is_layout_compatible>)(desde C++20) | verifica se dois tipos são [_layout-compatible_](<#/doc/language/data_members>)   
(class template)  
[ is_pointer_interconvertible_base_of](<#/doc/types/is_pointer_interconvertible_base_of>)(desde C++20) | verifica se um tipo é uma base (inicial) _[pointer-interconvertible](<#/doc/language/static_cast>)_ de outro tipo   
(class template)  
[ is_invocableis_invocable_ris_nothrow_invocableis_nothrow_invocable_r](<#/doc/types/is_invocable>)(desde C++17) | verifica se um tipo pode ser invocado (como se por [std::invoke](<#/doc/utility/functional/invoke>)) com os tipos de argumento fornecidos   
(class template)  
  
#### Transformações de tipo

Type transformation traits transformam um tipo em outro seguindo algumas regras predefinidas. 

Todos esses type traits satisfazem [TransformationTrait](<#/doc/named_req/TransformationTrait>). 

#####  Especificadores de const-volatilidade   
  
---  
Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  

```cpp
 remove_cvremove_constremove_volatile(desde C++11)(desde C++11)(desde C++11)
(class template)
 add_cvadd_constadd_volatile(desde C++11)(desde C++11)(desde C++11)
(class template)
```

  
#####  Referências   
  
Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  

```cpp
 remove_reference(desde C++11)
(class template)
 add_lvalue_referenceadd_rvalue_reference(desde C++11)(desde C++11)
(class template)
```

  
#####  Modificadores de sinal   
  
Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  

```cpp
 make_signed(desde C++11)
(class template)
 make_unsigned(desde C++11)
(class template)
```

  
#####  Arrays   
  
Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  

```cpp
 remove_extent(desde C++11)
(class template)
 remove_all_extents(desde C++11)
(class template)
```

  
#####  Ponteiros   
  
Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  

```cpp
 remove_pointer(desde C++11)
(class template)
 add_pointer(desde C++11)
(class template)
```

  
#####  Outras transformações   
  
Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  

```cpp
 aligned_storage(desde C++11)(obsoleto desde C++23)
(class template)
 aligned_union(desde C++11)(obsoleto desde C++23)
(class template)
 decay(desde C++11)
(class template)
 remove_cvref(desde C++20)
(class template)
 enable_if(desde C++11)
(class template)
 conditional(desde C++11)
(class template)
 common_type(desde C++11)
(class template)
 common_referencebasic_common_reference(desde C++20)
(class template)
 underlying_type(desde C++11)
(class template)
 result_ofinvoke_result(desde C++11)(removido em C++20)(desde C++17)
(class template)
 void_t(desde C++17)
(alias template)
 type_identity(desde C++20)
(class template)
```

  
#### Operações lógicas (desde C++17)

Logical operator traits aplicam operadores lógicos a outros type traits. 

Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  
---  
[ conjunction](<#/doc/types/conjunction>)(desde C++17) | metafunção AND lógica variádica   
(class template)  
[ disjunction](<#/doc/types/disjunction>)(desde C++17) | metafunção OR lógica variádica   
(class template)  
[ negation](<#/doc/types/negation>)(desde C++17) | metafunção NOT lógica   
(class template)  
  
#### Relações de membro (desde C++20)

Definido no header `[<type_traits>](<#/doc/header/type_traits>)`  
---  
[ is_pointer_interconvertible_with_class](<#/doc/types/is_pointer_interconvertible_with_class>)(desde C++20) | verifica se objetos de um tipo são _[pointer-interconvertible](<#/doc/language/static_cast>)_ com o subobjeto especificado desse tipo   
(function template)  
[ is_corresponding_member](<#/doc/types/is_corresponding_member>)(desde C++20) | verifica se dois membros especificados correspondem um ao outro na subsequência inicial comum de dois tipos especificados   
(function template)  
  
### [Aritmética racional em tempo de compilação](<#/doc/numeric/ratio>)

O header [`<ratio>`](<#/doc/header/ratio>) fornece [tipos e funções para manipular e armazenar razões em tempo de compilação](<#/doc/numeric/ratio>). 

### Sequências de inteiros em tempo de compilação (desde C++14)

Definido no header `[<utility>](<#/doc/header/utility>)`  
---  
[ integer_sequence](<#/doc/utility/integer_sequence>)(desde C++14) | implementa sequência de inteiros em tempo de compilação   
(class template)