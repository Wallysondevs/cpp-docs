# Cabeçalho da biblioteca padrão &lt;type_traits&gt; (C++11)

Este cabeçalho faz parte da biblioteca de [metaprogramação](<#/doc/meta>).

### Classes

---

##### Classes Auxiliares

[ integral_constantbool_constant](<#/doc/types/integral_constant>)(C++11)(C++17) | constante em tempo de compilação de tipo especificado com valor especificado
(modelo de classe)
`true_type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, true>
---|---
`false_type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, false>

##### Categorias de tipo primárias

[ is_void](<#/doc/types/is_void>)(C++11) | verifica se um tipo é void
(modelo de classe)
[ is_null_pointer](<#/doc/types/is_null_pointer>)(C++11)(DR*) | verifica se um tipo é [std::nullptr_t](<#/doc/types/nullptr_t>)
(modelo de classe)
[ is_integral](<#/doc/types/is_integral>)(C++11) | verifica se um tipo é um tipo integral
(modelo de classe)
[ is_floating_point](<#/doc/types/is_floating_point>)(C++11) | verifica se um tipo é um tipo de ponto flutuante
(modelo de classe)
[ is_array](<#/doc/types/is_array>)(C++11) | verifica se um tipo é um tipo array
(modelo de classe)
[ is_enum](<#/doc/types/is_enum>)(C++11) | verifica se um tipo é um tipo de enumeração
(modelo de classe)
[ is_union](<#/doc/types/is_union>)(C++11) | verifica se um tipo é um tipo union
(modelo de classe)
[ is_class](<#/doc/types/is_class>)(C++11) | verifica se um tipo é um tipo de classe não-union
(modelo de classe)
[ is_function](<#/doc/types/is_function>)(C++11) | verifica se um tipo é um tipo de função
(modelo de classe)
[ is_pointer](<#/doc/types/is_pointer>)(C++11) | verifica se um tipo é um tipo ponteiro
(modelo de classe)
[ is_lvalue_reference](<#/doc/types/is_lvalue_reference>)(C++11) | verifica se um tipo é uma _referência lvalue_
(modelo de classe)
[ is_rvalue_reference](<#/doc/types/is_rvalue_reference>)(C++11) | verifica se um tipo é uma _referência rvalue_
(modelo de classe)
[ is_member_object_pointer](<#/doc/types/is_member_object_pointer>)(C++11) | verifica se um tipo é um ponteiro para membro objeto não-estático
(modelo de classe)
[ is_member_function_pointer](<#/doc/types/is_member_function_pointer>)(C++11) | verifica se um tipo é um ponteiro para membro função não-estático
(modelo de classe)

##### Categorias de tipo compostas

[ is_fundamental](<#/doc/types/is_fundamental>)(C++11) | verifica se um tipo é um tipo fundamental
(modelo de classe)
[ is_arithmetic](<#/doc/types/is_arithmetic>)(C++11) | verifica se um tipo é um tipo aritmético
(modelo de classe)
[ is_scalar](<#/doc/types/is_scalar>)(C++11) | verifica se um tipo é um tipo escalar
(modelo de classe)
[ is_object](<#/doc/types/is_object>)(C++11) | verifica se um tipo é um tipo objeto
(modelo de classe)
[ is_compound](<#/doc/types/is_compound>)(C++11) | verifica se um tipo é um tipo composto
(modelo de classe)
[ is_reference](<#/doc/types/is_reference>)(C++11) | verifica se um tipo é uma _referência lvalue_ ou _referência rvalue_
(modelo de classe)
[ is_member_pointer](<#/doc/types/is_member_pointer>)(C++11) | verifica se um tipo é um ponteiro para uma função membro não-estática ou objeto
(modelo de classe)

##### Propriedades de tipo

[ is_const](<#/doc/types/is_const>)(C++11) | verifica se um tipo é qualificado como const
(modelo de classe)
[ is_volatile](<#/doc/types/is_volatile>)(C++11) | verifica se um tipo é qualificado como volatile
(modelo de classe)
[ is_trivial](<#/doc/types/is_trivial>)(C++11)(obsoleto desde C++26) | verifica se um tipo é trivial
(modelo de classe)
[ is_trivially_copyable](<#/doc/types/is_trivially_copyable>)(C++11) | verifica se um tipo é trivialmente copiável
(modelo de classe)
[ is_standard_layout](<#/doc/types/is_standard_layout>)(C++11) | verifica se um tipo é um tipo [standard-layout](<#/doc/language/data_members>)
(modelo de classe)
[ is_pod](<#/doc/types/is_pod>)(C++11)(obsoleto desde C++20) | verifica se um tipo é um tipo plain-old data (POD)
(modelo de classe)
[ is_literal_type](<#/doc/types/is_literal_type>)(C++11)(obsoleto desde C++17)(removido em C++20) | verifica se um tipo é um tipo literal
(modelo de classe)
[ has_unique_object_representations](<#/doc/types/has_unique_object_representations>)(C++17) | verifica se cada bit na representação de objeto do tipo contribui para seu valor
(modelo de classe)
[ is_empty](<#/doc/types/is_empty>)(C++11) | verifica se um tipo é um tipo de classe (mas não union) e não possui membros de dados não-estáticos
(modelo de classe)
[ is_polymorphic](<#/doc/types/is_polymorphic>)(C++11) | verifica se um tipo é um tipo de classe polimórfica
(modelo de classe)
[ is_abstract](<#/doc/types/is_abstract>)(C++11) | verifica se um tipo é um tipo de classe abstrata
(modelo de classe)
[ is_final](<#/doc/types/is_final>)(C++14) | verifica se um tipo é um tipo de classe final
(modelo de classe)
[ is_aggregate](<#/doc/types/is_aggregate>)(C++17) | verifica se um tipo é um tipo agregado
(modelo de classe)
[ is_implicit_lifetime](<#/doc/types/is_implicit_lifetime>)(C++23) | verifica se um tipo é um tipo de tempo de vida implícito
(modelo de classe)
[ is_signed](<#/doc/types/is_signed>)(C++11) | verifica se um tipo é um tipo aritmético com sinal
(modelo de classe)
[ is_unsigned](<#/doc/types/is_unsigned>)(C++11) | verifica se um tipo é um tipo aritmético sem sinal
(modelo de classe)
[ is_bounded_array](<#/doc/types/is_bounded_array>)(C++20) | verifica se um tipo é um tipo array de limite conhecido
(modelo de classe)
[ is_unbounded_array](<#/doc/types/is_unbounded_array>)(C++20) | verifica se um tipo é um tipo array de limite desconhecido
(modelo de classe)
[ is_scoped_enum](<#/doc/types/is_scoped_enum>)(C++23) | verifica se um tipo é um tipo de enumeração com escopo
(modelo de classe)

##### Operações suportadas

---
[ is_constructibleis_trivially_constructibleis_nothrow_constructible](<#/doc/types/is_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor para argumentos específicos
(modelo de classe)
[ is_default_constructibleis_trivially_default_constructibleis_nothrow_default_constructible](<#/doc/types/is_default_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor padrão
(modelo de classe)
[ is_copy_constructibleis_trivially_copy_constructibleis_nothrow_copy_constructible](<#/doc/types/is_copy_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor de cópia
(modelo de classe)
[ is_move_constructibleis_trivially_move_constructibleis_nothrow_move_constructible](<#/doc/types/is_move_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo pode ser construído a partir de uma referência rvalue
(modelo de classe)
[ is_assignableis_trivially_assignableis_nothrow_assignable](<#/doc/types/is_assignable>)(C++11)(C++11)(C++11) | verifica se um tipo possui um operador de atribuição para um argumento específico
(modelo de classe)
[ is_copy_assignableis_trivially_copy_assignableis_nothrow_copy_assignable](<#/doc/types/is_copy_assignable>)(C++11)(C++11)(C++11) | verifica se um tipo possui um operador de atribuição de cópia
(modelo de classe)
[ is_move_assignableis_trivially_move_assignableis_nothrow_move_assignable](<#/doc/types/is_move_assignable>)(C++11)(C++11)(C++11) | verifica se um tipo possui um operador de atribuição de movimento
(modelo de classe)
[ is_destructibleis_trivially_destructibleis_nothrow_destructible](<#/doc/types/is_destructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um destrutor não-deletado
(modelo de classe)
[ has_virtual_destructor](<#/doc/types/has_virtual_destructor>)(C++11) | verifica se um tipo possui um destrutor virtual
(modelo de classe)
[ is_swappable_withis_swappableis_nothrow_swappable_withis_nothrow_swappable](<#/doc/types/is_swappable>)(C++17)(C++17)(C++17)(C++17) | verifica se objetos de um tipo podem ser trocados com objetos do mesmo tipo ou de tipo diferente
(modelo de classe)
[ reference_converts_from_temporary](<#/doc/types/reference_converts_from_temporary>)(C++23) | verifica se uma referência está ligada a um temporário em inicialização por cópia
(modelo de classe)
[ reference_constructs_from_temporary](<#/doc/types/reference_constructs_from_temporary>)(C++23) | verifica se uma referência está ligada a um temporário em inicialização direta
(modelo de classe)

##### Consultas de propriedade

---
[ alignment_of](<#/doc/types/alignment_of>)(C++11) | obtém os requisitos de alinhamento do tipo
(modelo de classe)
[ rank](<#/doc/types/rank>)(C++11) | obtém o número de dimensões de um tipo array
(modelo de classe)
[ extent](<#/doc/types/extent>)(C++11) | obtém o tamanho de um tipo array ao longo de uma dimensão especificada
(modelo de classe)

##### Relações de tipo

---
[ is_same](<#/doc/types/is_same>)(C++11) | verifica se dois tipos são os mesmos
(modelo de classe)
[ is_base_of](<#/doc/types/is_base_of>)(C++11) | verifica se um tipo é uma base do outro tipo
(modelo de classe)
[ is_virtual_base_of](<#/doc/types/is_virtual_base_of>)(C++26) | verifica se um tipo é uma base virtual do outro tipo
(modelo de classe)
[ is_convertibleis_nothrow_convertible](<#/doc/types/is_convertible>)(C++11)(C++20) | verifica se um tipo pode ser convertido para o outro tipo
(modelo de classe)
[ is_layout_compatible](<#/doc/types/is_layout_compatible>)(C++20) | verifica se dois tipos são [_layout-compatible_](<#/doc/language/data_members>)
(modelo de classe)
[ is_pointer_interconvertible_base_of](<#/doc/types/is_pointer_interconvertible_base_of>)(C++20) | verifica se um tipo é uma base (inicial) _[pointer-interconvertible](<#/doc/language/static_cast>)_ de outro tipo
(modelo de classe)
[ is_invocableis_invocable_ris_nothrow_invocableis_nothrow_invocable_r](<#/doc/types/is_invocable>)(C++17) | verifica se um tipo pode ser invocado (como se por [std::invoke](<#/doc/utility/functional/invoke>)) com os tipos de argumento fornecidos
(modelo de classe)

##### Especificadores const-volatile

[ remove_cvremove_constremove_volatile](<#/doc/types/remove_cv>)(C++11)(C++11)(C++11) | remove os especificadores const e/ou volatile do tipo fornecido
(modelo de classe)
[ add_cvadd_constadd_volatile](<#/doc/types/add_cv>)(C++11)(C++11)(C++11) | adiciona os especificadores const e/ou volatile ao tipo fornecido
(modelo de classe)

##### Referências

[ remove_reference](<#/doc/types/remove_reference>)(C++11) | remove uma referência do tipo fornecido
(modelo de classe)
[ add_lvalue_referenceadd_rvalue_reference](<#/doc/types/add_reference>)(C++11)(C++11) | adiciona uma referência _lvalue_ ou _rvalue_ ao tipo fornecido
(modelo de classe)

##### Ponteiros

[ remove_pointer](<#/doc/types/remove_pointer>)(C++11) | remove um ponteiro do tipo fornecido
(modelo de classe)
[ add_pointer](<#/doc/types/add_pointer>)(C++11) | adiciona um ponteiro ao tipo fornecido
(modelo de classe)

##### Modificadores de sinal

[ make_signed](<#/doc/types/make_signed>)(C++11) | obtém o tipo com sinal correspondente para o tipo integral fornecido
(modelo de classe)
[ make_unsigned](<#/doc/types/make_unsigned>)(C++11) | obtém o tipo sem sinal correspondente para o tipo integral fornecido
(modelo de classe)

##### Arrays

[ remove_extent](<#/doc/types/remove_extent>)(C++11) | remove uma extensão do tipo array fornecido
(modelo de classe)
[ remove_all_extents](<#/doc/types/remove_all_extents>)(C++11) | remove todas as extensões do tipo array fornecido
(modelo de classe)

##### Transformações diversas

[ aligned_storage](<#/doc/types/aligned_storage>)(desde C++11)(obsoleto desde C++23) | define o tipo adequado para uso como armazenamento não inicializado para tipos de determinado tamanho
(modelo de classe)
[ aligned_union](<#/doc/types/aligned_union>)(desde C++11)(obsoleto desde C++23) | define o tipo adequado para uso como armazenamento não inicializado para todos os tipos fornecidos
(modelo de classe)
[ decay](<#/doc/types/decay>)(C++11) | aplica transformações de tipo como ao passar um argumento de função por valor
(modelo de classe)
[ remove_cvref](<#/doc/types/remove_cvref>)(C++20) | combina [std::remove_cv](<#/doc/types/remove_cv>) e [std::remove_reference](<#/doc/types/remove_reference>)
(modelo de classe)
[ enable_if](<#/doc/types/enable_if>)(C++11) | [remove](<#/doc/language/sfinae>) condicionalmente uma sobrecarga de função ou especialização de template da resolução de sobrecarga
(modelo de classe)
[ conditional](<#/doc/types/conditional>)(C++11) | escolhe um tipo ou outro com base em um booleano em tempo de compilação
(modelo de classe)
[ common_type](<#/doc/types/common_type>)(C++11) | determina o tipo comum de um grupo de tipos
(modelo de classe)
[ common_referencebasic_common_reference](<#/doc/types/common_reference>)(C++20) | determina o tipo de referência comum de um grupo de tipos
(modelo de classe)
[ underlying_type](<#/doc/types/underlying_type>)(C++11) | obtém o tipo inteiro subjacente para um determinado tipo de enumeração
(modelo de classe)
[ result_ofinvoke_result](<#/doc/types/result_of>)(C++11)(removido em C++20)(C++17) | deduz o tipo de resultado da invocação de um objeto chamável com um conjunto de argumentos
(modelo de classe)
[ void_t](<#/doc/types/void_t>)(C++17) | modelo de alias variádico void
(modelo de alias)
[ type_identity](<#/doc/types/type_identity>)(C++20) | retorna o argumento de tipo inalterado
(modelo de classe)
[ unwrap_referenceunwrap_ref_decay](<#/doc/utility/functional/unwrap_reference>)(C++20)(C++20) | obtém o tipo de referência encapsulado em [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)
(modelo de classe)

##### Operações em traits

[ conjunction](<#/doc/types/conjunction>)(C++17) | metafunção AND lógica variádica
(modelo de classe)
[ disjunction](<#/doc/types/disjunction>)(C++17) | metafunção OR lógica variádica
(modelo de classe)
[ negation](<#/doc/types/negation>)(C++17) | metafunção NOT lógica
(modelo de classe)

### Funções

##### Relações de membro

[ is_pointer_interconvertible_with_class](<#/doc/types/is_pointer_interconvertible_with_class>)(C++20) | verifica se objetos de um tipo são _[pointer-interconvertible](<#/doc/language/static_cast>)_ com o subobjeto especificado desse tipo
(modelo de função)
[ is_corresponding_member](<#/doc/types/is_corresponding_member>)(C++20) | verifica se dois membros especificados correspondem um ao outro na subsequência inicial comum de dois tipos especificados
(modelo de função)

##### Contexto de avaliação constante

[ is_constant_evaluated](<#/doc/types/is_constant_evaluated>)(C++20) | detecta se a chamada ocorre dentro de um contexto avaliado como constante
(função)
[ is_within_lifetime](<#/doc/types/is_within_lifetime>)(C++26) | verifica se um ponteiro está dentro do tempo de vida do objeto em tempo de compilação
(função)

### Sinopse
```cpp
    namespace std {
      // helper class
      template<class T, T v> struct integral_constant;
    
      template<bool B>
        using bool_constant = integral_constant<bool, B>;
      using true_type  = bool_constant<true>;
      using false_type = bool_constant<false>;
    
      // primary type categories
      template<class T> struct is_void;
      template<class T> struct is_null_pointer;
      template<class T> struct is_integral;
      template<class T> struct is_floating_point;
      template<class T> struct is_array;
      template<class T> struct is_pointer;
      template<class T> struct is_lvalue_reference;
      template<class T> struct is_rvalue_reference;
      template<class T> struct is_member_object_pointer;
      template<class T> struct is_member_function_pointer;
      template<class T> struct is_enum;
      template<class T> struct is_union;
      template<class T> struct is_class;
      template<class T> struct is_function;
    
      // composite type categories
      template<class T> struct is_reference;
      template<class T> struct is_arithmetic;
      template<class T> struct is_fundamental;
      template<class T> struct is_object;
      template<class T> struct is_scalar;
      template<class T> struct is_compound;
      template<class T> struct is_member_pointer;
    
      // type properties
      template<class T> struct is_const;
      template<class T> struct is_volatile;
      template<class T> struct is_trivial;
      template<class T> struct is_trivially_copyable;
      template<class T> struct is_standard_layout;
      template<class T> struct is_empty;
      template<class T> struct is_polymorphic;
      template<class T> struct is_abstract;
      template<class T> struct is_final;
      template<class T> struct is_aggregate;
    
      template<class T> struct is_signed;
      template<class T> struct is_unsigned;
      template<class T> struct is_bounded_array;
      template<class T> struct is_unbounded_array;
      template<class T> struct is_scoped_enum;
    
      template<class T, class... Args> struct is_constructible;
      template<class T> struct is_default_constructible;
      template<class T> struct is_copy_constructible;
      template<class T> struct is_move_constructible;
    
      template<class T, class U> struct is_assignable;
      template<class T> struct is_copy_assignable;
      template<class T> struct is_move_assignable;
    
      template<class T, class U> struct is_swappable_with;
      template<class T> struct is_swappable;
    
      template<class T> struct is_destructible;
    
      template<class T, class... Args> struct is_trivially_constructible;
      template<class T> struct is_trivially_default_constructible;
      template<class T> struct is_trivially_copy_constructible;
      template<class T> struct is_trivially_move_constructible;
    
      template<class T, class U> struct is_trivially_assignable;
      template<class T> struct is_trivially_copy_assignable;
      template<class T> struct is_trivially_move_assignable;
      template<class T> struct is_trivially_destructible;
    
      template<class T, class... Args> struct is_nothrow_constructible;
      template<class T> struct is_nothrow_default_constructible;
      template<class T> struct is_nothrow_copy_constructible;
      template<class T> struct is_nothrow_move_constructible;
    
      template<class T, class U> struct is_nothrow_assignable;
      template<class T> struct is_nothrow_copy_assignable;
      template<class T> struct is_nothrow_move_assignable;
    
      template<class T, class U> struct is_nothrow_swappable_with;
      template<class T> struct is_nothrow_swappable;
    
      template<class T> struct is_nothrow_destructible;
    
      template<class T> struct has_virtual_destructor;
    
      template<class T> struct has_unique_object_representations;
    
      template<class T, class U> struct reference_constructs_from_temporary;
      template<class T, class U> struct reference_converts_from_temporary;
    
      // type property queries
      template<class T> struct alignment_of;
      template<class T> struct rank;
      template<class T, unsigned I = 0> struct extent;
    
      // type relations
      template<class T, class U> struct is_same;
      template<class Base, class Derived> struct is_base_of;
      template<class Base, class Derived> struct is_virtual_base_of;
      template<class From, class To> struct is_convertible;
      template<class From, class To> struct is_nothrow_convertible;
      template<class T, class U> struct is_layout_compatible;
      template<class Base, class Derived> struct is_pointer_interconvertible_base_of;
    
      template<class Fn, class... ArgTypes> struct is_invocable;
      template<class R, class Fn, class... ArgTypes> struct is_invocable_r;
    
      template<class Fn, class... ArgTypes> struct is_nothrow_invocable;
      template<class R, class Fn, class... ArgTypes> struct is_nothrow_invocable_r;
    
      // const-volatile modifications
      template<class T> struct remove_const;
      template<class T> struct remove_volatile;
      template<class T> struct remove_cv;
      template<class T> struct add_const;
      template<class T> struct add_volatile;
      template<class T> struct add_cv;
    
      template<class T>
        using remove_const_t    = typename remove_const<T>::type;
      template<class T>
        using remove_volatile_t = typename remove_volatile<T>::type;
      template<class T>
        using remove_cv_t       = typename remove_cv<T>::type;
      template<class T>
        using add_const_t       = typename add_const<T>::type;
      template<class T>
        using add_volatile_t    = typename add_volatile<T>::type;
      template<class T>
        using add_cv_t          = typename add_cv<T>::type;
    
      // reference modifications
      template<class T> struct remove_reference;
      template<class T> struct add_lvalue_reference;
      template<class T> struct add_rvalue_reference;
    
      template<class T>
        using remove_reference_t     = typename remove_reference<T>::type;
      template<class T>
        using add_lvalue_reference_t = typename add_lvalue_reference<T>::type;
      template<class T>
        using add_rvalue_reference_t = typename add_rvalue_reference<T>::type;
    
      // sign modifications
      template<class T> struct make_signed;
      template<class T> struct make_unsigned;
    
      template<class T>
        using make_signed_t   = typename make_signed<T>::type;
      template<class T>
        using make_unsigned_t = typename make_unsigned<T>::type;
    
      // array modifications
      template<class T> struct remove_extent;
      template<class T> struct remove_all_extents;
    
      template<class T>
        using remove_extent_t      = typename remove_extent<T>::type;
      template<class T>
        using remove_all_extents_t = typename remove_all_extents<T>::type;
    
      // pointer modifications
      template<class T> struct remove_pointer;
      template<class T> struct add_pointer;
    
      template<class T>
        using remove_pointer_t = typename remove_pointer<T>::type;
      template<class T>
        using add_pointer_t    = typename add_pointer<T>::type;
    
      // other transformations
      template<class T> struct type_identity;
      template<class T> struct remove_cvref;
      template<class T> struct decay;
      template<bool, class T = void> struct enable_if;
      template<bool, class T, class F> struct conditional;
      template<class... T> struct common_type;
      template<class T, class U, template<class> class TQual, template<class> class UQual>
        struct basic_common_reference { };
      template<class... T> struct common_reference;
      template<class T> struct underlying_type;
      template<class Fn, class... ArgTypes> struct invoke_result;
      template<class T> struct unwrap_reference;
      template<class T> struct unwrap_ref_decay;
    
      template<class T>
        using type_identity_t    = typename type_identity<T>::type;
      template<class T>
        using remove_cvref_t     = typename remove_cvref<T>::type;
      template<class T>
        using decay_t            = typename decay<T>::type;
      template<bool b, class T = void>
        using enable_if_t        = typename enable_if<b, T>::type;
      template<bool b, class T, class F>
        using conditional_t      = typename conditional<b, T, F>::type;
      template<class... T>
        using common_type_t      = typename common_type<T...>::type;
      template<class... T>
        using common_reference_t = typename common_reference<T...>::type;
      template<class T>
        using underlying_type_t  = typename underlying_type<T>::type;
      template<class Fn, class... ArgTypes>
        using invoke_result_t    = typename invoke_result<Fn, ArgTypes...>::type;
      template<class T>
        using unwrap_reference_t = typename unwrap_reference<T>::type;
      template<class T>
        using unwrap_ref_decay_t = typename unwrap_ref_decay<T>::type;
      template<class...>
        using void_t             = void;
    
      // logical operator traits
      template<class... B> struct conjunction;
      template<class... B> struct disjunction;
      template<class B> struct negation;
    
      // primary type categories
      template<class T>
        inline constexpr bool is_void_v = is_void<T>::value;
      template<class T>
        inline constexpr bool is_null_pointer_v = is_null_pointer<T>::value;
      template<class T>
        inline constexpr bool is_integral_v = is_integral<T>::value;
      template<class T>
        inline constexpr bool is_floating_point_v = is_floating_point<T>::value;
      template<class T>
        inline constexpr bool is_array_v = is_array<T>::value;
      template<class T>
        inline constexpr bool is_pointer_v = is_pointer<T>::value;
      template<class T>
        inline constexpr bool is_lvalue_reference_v = is_lvalue_reference<T>::value;
      template<class T>
        inline constexpr bool is_rvalue_reference_v = is_rvalue_reference<T>::value;
      template<class T>
        inline constexpr bool is_member_object_pointer_v = is_member_object_pointer<T>::value;
      template<class T>
        inline constexpr bool is_member_function_pointer_v = is_member_function_pointer<T>::value;
      template<class T>
        inline constexpr bool is_enum_v = is_enum<T>::value;
      template<class T>
        inline constexpr bool is_union_v = is_union<T>::value;
      template<class T>
        inline constexpr bool is_class_v = is_class<T>::value;
      template<class T>
        inline constexpr bool is_function_v = is_function<T>::value;
    
      // composite type categories
      template<class T>
        inline constexpr bool is_reference_v = is_reference<T>::value;
      template<class T>
        inline constexpr bool is_arithmetic_v = is_arithmetic<T>::value;
      template<class T>
        inline constexpr bool is_fundamental_v = is_fundamental<T>::value;
      template<class T>
        inline constexpr bool is_object_v = is_object<T>::value;
      template<class T>
        inline constexpr bool is_scalar_v = is_scalar<T>::value;
      template<class T>
        inline constexpr bool is_compound_v = is_compound<T>::value;
      template<class T>
        inline constexpr bool is_member_pointer_v = is_member_pointer<T>::value;
    
      // type properties
      template<class T>
        inline constexpr bool is_const_v = is_const<T>::value;
      template<class T>
        inline constexpr bool is_volatile_v = is_volatile<T>::value;
      template<class T>
        inline constexpr bool is_trivial_v = is_trivial<T>::value;
      template<class T>
        inline constexpr bool is_trivially_copyable_v = is_trivially_copyable<T>::value;
      template<class T>
        inline constexpr bool is_standard_layout_v = is_standard_layout<T>::value;
      template<class T>
        inline constexpr bool is_empty_v = is_empty<T>::value;
      template<class T>
        inline constexpr bool is_polymorphic_v = is_polymorphic<T>::value;
      template<class T>
        inline constexpr bool is_abstract_v = is_abstract<T>::value;
      template<class T>
        inline constexpr bool is_final_v = is_final<T>::value;
      template<class T>
        inline constexpr bool is_aggregate_v = is_aggregate<T>::value;
      template<class T>
        inline constexpr bool is_signed_v = is_signed<T>::value;
      template<class T>
        inline constexpr bool is_unsigned_v = is_unsigned<T>::value;
      template<class T>
        inline constexpr bool is_bounded_array_v = is_bounded_array<T>::value;
      template<class T>
        inline constexpr bool is_unbounded_array_v = is_unbounded_array<T>::value;
      template<class T>
        inline constexpr bool is_scoped_enum_v = is_scoped_enum<T>::value;
      template<class T, class... Args>
        inline constexpr bool is_constructible_v = is_constructible<T, Args...>::value;
      template<class T>
        inline constexpr bool is_default_constructible_v = is_default_constructible<T>::value;
      template<class T>
        inline constexpr bool is_copy_constructible_v = is_copy_constructible<T>::value;
      template<class T>
        inline constexpr bool is_move_constructible_v = is_move_constructible<T>::value;
      template<class T, class U>
        inline constexpr bool is_assignable_v = is_assignable<T, U>::value;
      template<class T>
        inline constexpr bool is_copy_assignable_v = is_copy_assignable<T>::value;
      template<class T>
        inline constexpr bool is_move_assignable_v = is_move_assignable<T>::value;
      template<class T, class U>
        inline constexpr bool is_swappable_with_v = is_swappable_with<T, U>::value;
      template<class T>
        inline constexpr bool is_swappable_v = is_swappable<T>::value;
      template<class T>
        inline constexpr bool is_destructible_v = is_destructible<T>::value;
      template<class T, class... Args>
        inline constexpr bool is_trivially_constructible_v
          = is_trivially_constructible<T, Args...>::value;
      template<class T>
        inline constexpr bool is_trivially_default_constructible_v
          = is_trivially_default_constructible<T>::value;
      template<class T>
        inline constexpr bool is_trivially_copy_constructible_v
          = is_trivially_copy_constructible<T>::value;
      template<class T>
```
```cpp
        inline constexpr bool is_trivially_move_constructible_v
          = is_trivially_move_constructible<T>::value;
      template<class T, class U>
        inline constexpr bool is_trivially_assignable_v = is_trivially_assignable<T, U>::value;
      template<class T>
        inline constexpr bool is_trivially_copy_assignable_v
          = is_trivially_copy_assignable<T>::value;
      template<class T>
        inline constexpr bool is_trivially_move_assignable_v
          = is_trivially_move_assignable<T>::value;
      template<class T>
        inline constexpr bool is_trivially_destructible_v = is_trivially_destructible<T>::value;
      template<class T, class... Args>
        inline constexpr bool is_nothrow_constructible_v
          = is_nothrow_constructible<T, Args...>::value;
      template<class T>
        inline constexpr bool is_nothrow_default_constructible_v
          = is_nothrow_default_constructible<T>::value;
      template<class T>
        inline constexpr bool is_nothrow_copy_constructible_v
          = is_nothrow_copy_constructible<T>::value;
      template<class T>
        inline constexpr bool is_nothrow_move_constructible_v
          = is_nothrow_move_constructible<T>::value;
      template<class T, class U>
        inline constexpr bool is_nothrow_assignable_v = is_nothrow_assignable<T, U>::value;
      template<class T>
        inline constexpr bool is_nothrow_copy_assignable_v = is_nothrow_copy_assignable<T>::value;
      template<class T>
        inline constexpr bool is_nothrow_move_assignable_v = is_nothrow_move_assignable<T>::value;
      template<class T, class U>
        inline constexpr bool is_nothrow_swappable_with_v = is_nothrow_swappable_with<T, U>::value;
      template<class T>
        inline constexpr bool is_nothrow_swappable_v = is_nothrow_swappable<T>::value;
      template<class T>
        inline constexpr bool is_nothrow_destructible_v = is_nothrow_destructible<T>::value;
      template<class T>
        inline constexpr bool has_virtual_destructor_v = has_virtual_destructor<T>::value;
      template<class T>
        inline constexpr bool has_unique_object_representations_v
          = has_unique_object_representations<T>::value;
      template<class T, class U>
        inline constexpr bool reference_constructs_from_temporary_v
          = reference_constructs_from_temporary<T, U>::value;
      template<class T, class U>
        inline constexpr bool reference_converts_from_temporary_v
          = reference_converts_from_temporary<T, U>::value;
     
      // type property queries
      template<class T>
        inline constexpr size_t alignment_of_v = alignment_of<T>::value;
      template<class T>
        inline constexpr size_t rank_v = rank<T>::value;
      template<class T, unsigned I = 0>
        inline constexpr size_t extent_v = extent<T, I>::value;
     
      // type relations
      template<class T, class U>
        inline constexpr bool is_same_v = is_same<T, U>::value;
      template<class Base, class Derived>
        inline constexpr bool is_base_of_v = is_base_of<Base, Derived>::value;
      template<class Base, class Derived>
        inline constexpr bool is_virtual_base_of_v = is_virtual_base_of<Base, Derived>::value;
      template<class From, class To>
        inline constexpr bool is_convertible_v = is_convertible<From, To>::value;
      template<class From, class To>
        inline constexpr bool is_nothrow_convertible_v = is_nothrow_convertible<From, To>::value;
      template<class T, class U>
        inline constexpr bool is_layout_compatible_v = is_layout_compatible<T, U>::value;
      template<class Base, class Derived>
        inline constexpr bool is_pointer_interconvertible_base_of_v
          = is_pointer_interconvertible_base_of<Base, Derived>::value;
      template<class Fn, class... ArgTypes>
        inline constexpr bool is_invocable_v = is_invocable<Fn, ArgTypes...>::value;
      template<class R, class Fn, class... ArgTypes>
        inline constexpr bool is_invocable_r_v = is_invocable_r<R, Fn, ArgTypes...>::value;
      template<class Fn, class... ArgTypes>
        inline constexpr bool is_nothrow_invocable_v = is_nothrow_invocable<Fn, ArgTypes...>::value;
      template<class R, class Fn, class... ArgTypes>
        inline constexpr bool is_nothrow_invocable_r_v
          = is_nothrow_invocable_r<R, Fn, ArgTypes...>::value;
     
      // logical operator traits
      template<class... B>
        inline constexpr bool conjunction_v = conjunction<B...>::value;
      template<class... B>
        inline constexpr bool disjunction_v = disjunction<B...>::value;
      template<class B>
        inline constexpr bool negation_v = negation<B>::value;
     
      // member relationships
      template<class S, class M>
        constexpr bool is_pointer_interconvertible_with_class(M S::*m) noexcept;
      template<class S1, class S2, class M1, class M2>
        constexpr bool is_corresponding_member(M1 S1::*m1, M2 S2::*m2) noexcept;
     
      // constant evaluation context
      constexpr bool is_constant_evaluated() noexcept;
      consteval bool is_within_lifetime(const auto*) noexcept;
    }
```

#### Modelo de classe [std::integral_constant](<#/doc/types/integral_constant>)
```cpp
    namespace std {
      template <class T, T v>
      struct integral_constant {
        static constexpr T value = v;
        using value_type = T;
        using type = integral_constant<T, v>;
        constexpr operator value_type() const noexcept { return value; }
        constexpr value_type operator()() const noexcept { return value; }
      };
    }
```