# Requisitos nomeados C++: BinaryTypeTrait (desde C++11)

Um **BinaryTypeTrait** é um template de classe que descreve uma relação entre seus dois parâmetros de tipo de template com uma especialização de [std::integral_constant](<#/doc/types/integral_constant>) (tipicamente [std::bool_constant](<#/doc/types/integral_constant>)).

### Requisitos

*   [DefaultConstructible](<#/doc/named_req/DefaultConstructible>) e [CopyConstructible](<#/doc/named_req/CopyConstructible>).
*   Aceita dois parâmetros de tipo de template (parâmetros de template adicionais são opcionais e permitidos).
*   Derivado publicamente e sem ambiguidade de uma especialização de [std::integral_constant](<#/doc/types/integral_constant>), conhecida como sua _característica base_.
*   Os nomes dos membros da _característica base_ não estão ocultos e estão disponíveis sem ambiguidade.

### Biblioteca padrão

Os seguintes templates de classe da biblioteca padrão satisfazem **BinaryTypeTrait**:

[ is_same](<#/doc/types/is_same>)(C++11) | verifica se dois tipos são os mesmos
(template de classe)
[ is_base_of](<#/doc/types/is_base_of>)(C++11) | verifica se um tipo é base do outro tipo
(template de classe)
[ is_virtual_base_of](<#/doc/types/is_virtual_base_of>)(C++26) | verifica se um tipo é uma base virtual do outro tipo
(template de classe)
[ is_convertibleis_nothrow_convertible](<#/doc/types/is_convertible>)(C++11)(C++20) | verifica se um tipo pode ser convertido para o outro tipo
(template de classe)
[ is_layout_compatible](<#/doc/types/is_layout_compatible>)(C++20) | verifica se dois tipos são [_layout-compatible_](<#/doc/language/data_members>)
(template de classe)
[ is_pointer_interconvertible_base_of](<#/doc/types/is_pointer_interconvertible_base_of>)(C++20) | verifica se um tipo é uma base (inicial) _[pointer-interconvertible](<#/doc/language/static_cast>)_ de outro tipo
(template de classe)
[ is_invocableis_invocable_ris_nothrow_invocableis_nothrow_invocable_r](<#/doc/types/is_invocable>)(C++17) | verifica se um tipo pode ser invocado (como se por [std::invoke](<#/doc/utility/functional/invoke>)) com os tipos de argumento fornecidos
(template de classe)
[ uses_allocator](<#/doc/memory/uses_allocator>)(C++11) | verifica se o tipo especificado suporta construção uses-allocator
(template de classe)
*[_(as is)_]: A::pointer