# Estendendo o namespace std

### Adicionando declarações a `std`

É comportamento indefinido adicionar declarações ou definições ao namespace `std` ou a qualquer namespace aninhado dentro de `std`, com algumas exceções notadas abaixo.
```cpp
    #include <utility>
    
    namespace std
    {
        // a function definition added to namespace std: undefined behavior
        pair<int, int> operator+(pair<int, int> a, pair<int, int> b)
        {
            return {a.first + b.first, a.second + b.second};
        }
    }
```

### Adicionando especializações de template

#### Templates de classe

É permitido adicionar especializações de template para qualquer template de classe da biblioteca padrão ao namespace `std` somente se a declaração depender de pelo menos um [tipo definido pelo programa](<#/doc/language/type-id>) e a especialização satisfizer todos os requisitos para o template original, exceto onde tais especializações são proibidas.
```cpp
    // Get the declaration of the primary std::hash template.
    // We are not permitted to declare it ourselves.
    // <typeindex> is guaranteed to provide such a declaration, 
    // and is much cheaper to include than <functional>.
    
    #include <typeindex> 
    
    // Specialize std::hash so that MyType can be used as a key in 
    // std::unordered_set and std::unordered_map.  Opening namespace
    // std can accidentally introduce undefined behavior, and is not
    // necessary for specializing class templates.
    template<>
    struct std::hash<MyType>
    {
        std::size_t operator()(const MyType& t) const { return t.hash(); }
    };
```

  * Especializar o template [std::complex](<#/doc/numeric/complex>) para qualquer tipo diferente de float, double e long double é não especificado.

  * Especializações de [std::numeric_limits](<#/doc/types/numeric_limits>) devem definir todos os membros declarados static const(até C++11)static constexpr(desde C++11) no template primário, de tal forma que sejam utilizáveis como [expressões constantes integrais](<#/doc/language/constant_expression>).

  * Nenhum dos templates definidos em [`<type_traits>`](<#/doc/header/type_traits>) pode ser especializado para um [tipo definido pelo programa](<#/doc/language/type-id>), exceto para [std::common_type](<#/doc/types/common_type>) e [`std::basic_common_reference`](<#/doc/types/common_reference>)(desde C++20). Isso inclui os [type traits](<#/doc/types>) e o template de classe [std::integral_constant](<#/doc/types/integral_constant>).

  * Especializações de [std::hash](<#/doc/utility/hash>) para tipos definidos pelo programa devem satisfazer os requisitos [Hash](<#/doc/named_req/Hash>).

  * Especializações de [std::atomic](<#/doc/atomic/atomic>) devem ter um construtor de cópia deletado, um operador de atribuição de cópia deletado e um construtor de valor constexpr.

  * Especializações de [std::shared_ptr](<#/doc/memory/shared_ptr>) e [std::weak_ptr](<#/doc/memory/weak_ptr>) devem ser [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>). Além disso, especializações de [std::shared_ptr](<#/doc/memory/shared_ptr>) devem ser [LessThanComparable](<#/doc/named_req/LessThanComparable>) e conversíveis para bool.

  * Especializações de [std::istreambuf_iterator](<#/doc/iterator/istreambuf_iterator>) devem ter um construtor de cópia trivial, um construtor padrão constexpr e um destrutor trivial.

| (desde C++11)
  * [std::unary_function](<#/doc/utility/functional/unary_function>) e [std::binary_function](<#/doc/utility/functional/binary_function>) não podem ser especializados.

| (até C++17)

É comportamento indefinido declarar uma especialização completa ou parcial de qualquer template de classe membro de uma classe ou template de classe da biblioteca padrão.

| Esta seção está incompleta
Razão: mini-exemplo

#### Templates de função e funções membro de templates

É permitido adicionar especializações de template para qualquer template de função da biblioteca padrão ao namespace `std` somente se a declaração depender de pelo menos um [tipo definido pelo programa](<#/doc/language/type-id>) e a especialização satisfizer todos os requisitos para o template original, exceto onde tais especializações são proibidas. | (até C++20)
---|---
É comportamento indefinido declarar uma especialização completa de qualquer template de função da biblioteca padrão. | (desde C++20)
| Esta seção está incompleta
Razão: mini-exemplo

É comportamento indefinido declarar uma especialização completa de qualquer função membro de um template de classe da biblioteca padrão:

| Esta seção está incompleta
Razão: mini-exemplo

É comportamento indefinido declarar uma especialização completa de qualquer template de função membro de uma classe ou template de classe da biblioteca padrão:

| Esta seção está incompleta
Razão: mini-exemplo

#### Templates de variável

É comportamento indefinido declarar uma especialização completa ou parcial de qualquer template de variável da biblioteca padrão, exceto onde explicitamente permitido. | | Esta seção está incompleta
Razão: mini-exemplo

  * Especializações de [std::disable_sized_sentinel_for](<#/doc/iterator/sized_sentinel_for>), [std::ranges::disable_sized_range](<#/doc/ranges/sized_range>), [std::ranges::enable_view](<#/doc/ranges/view>) e [std::ranges::enable_borrowed_range](<#/doc/ranges/borrowed_range>) devem ser utilizáveis em expressões constantes e ter o tipo const bool. E
    * `std::disable_sized_sentinel_for` pode ser especializado para tipos de objeto não-array cv-não-qualificados `S` e `I`, sendo que pelo menos um deles é um [tipo definido pelo programa](<#/doc/language/type-id>).
    * `std::ranges::disable_sized_range`, `std::ranges::enable_view` e `std::ranges::enable_borrowed_range` podem ser especializados para tipos definidos pelo programa cv-não-qualificados.
  * Cada [template de variável de constante matemática](<#/doc/numeric/constants>) pode ser parcial ou explicitamente especializado, desde que a especialização dependa de um tipo definido pelo programa.

| (desde C++20)
(desde C++14)

### Instanciação explícita de templates

É permitido instanciar explicitamente um template de classe (desde C++20)definido na biblioteca padrão somente se a declaração depender do nome de pelo menos um [tipo definido pelo programa](<#/doc/language/type-id>) e a instanciação atender aos requisitos da biblioteca padrão para o template original.

| Esta seção está incompleta
Razão: mini-exemplo

### Outras restrições

O namespace `std` não pode ser declarado como um [inline namespace](<#/doc/language/namespace>).

#### Restrição de endereçamento

O comportamento de um programa C++ é não especificado (possivelmente malformado) se ele tentar, explícita ou implicitamente, formar um ponteiro, referência (para funções livres e funções membro estáticas) ou ponteiro para membro (para funções membro não estáticas) para uma função da biblioteca padrão ou uma instanciação de um template de função da biblioteca padrão, a menos que seja designada uma _função endereçável_ (veja abaixo). O código a seguir era bem definido em C++17, mas leva a comportamentos não especificados e possivelmente falha na compilação desde C++20:
```cpp
    #include <cmath>
    #include <memory>
    
    int main()
    {
        // by unary operator&
        auto fptr0 = &static_cast<float(&)(float, float)>(std::betaf);
    
        // by std::addressof
        auto fptr1 = std::addressof(static_cast<float(&)(float, float)>(std::betaf));
    
        // by function-to-pointer implicit conversion
        auto fptr2 = static_cast<float(&)(float)>(std::riemann_zetaf);
    
        // forming a reference
        auto& fref = static_cast<float(&)(float)>(std::riemann_zetaf);
    }
```

#### Funções endereçáveis designadas

  * [Manipuladores de E/S](<#/doc/io/manip>):
    * Manipuladores `fmtflags`:
      * [std::boolalpha](<#/doc/io/manip/boolalpha>)
      * [std::noboolalpha](<#/doc/io/manip/boolalpha>)
      * [std::showbase](<#/doc/io/manip/showbase>)
      * [std::noshowbase](<#/doc/io/manip/showbase>)
      * [std::showpoint](<#/doc/io/manip/showpoint>)
      * [std::noshowpoint](<#/doc/io/manip/showpoint>)
      * [std::showpos](<#/doc/io/manip/showpos>)
      * [std::noshowpos](<#/doc/io/manip/showpos>)
      * [std::skipws](<#/doc/io/manip/skipws>)
      * [std::noskipws](<#/doc/io/manip/skipws>)
      * [std::uppercase](<#/doc/io/manip/uppercase>)
      * [std::nouppercase](<#/doc/io/manip/uppercase>)
      * [std::unitbuf](<#/doc/io/manip/unitbuf>)
      * [std::nounitbuf](<#/doc/io/manip/unitbuf>)
    * Manipuladores `adjustfield`:
      * [std::internal](<#/doc/io/manip/left>)
      * [std::left](<#/doc/io/manip/left>)
      * [std::right](<#/doc/io/manip/left>)
    * Manipuladores `basefield`:
      * [std::dec](<#/doc/io/manip/hex>)
      * [std::hex](<#/doc/io/manip/hex>)
      * [std::oct](<#/doc/io/manip/hex>)
    * Manipuladores `floatfield`:
      * [std::fixed](<#/doc/io/manip/fixed>)
      * [std::scientific](<#/doc/io/manip/fixed>)
      * [std::hexfloat](<#/doc/io/manip/fixed>)
      * [std::defaultfloat](<#/doc/io/manip/fixed>)
    * Manipuladores `basic_istream`:
      * [std::ws](<#/doc/io/manip/ws>)
    * Manipuladores `basic_ostream`:
      * [std::endl](<#/doc/io/manip/endl>)
      * [std::ends](<#/doc/io/manip/ends>)
      * [std::flush](<#/doc/io/manip/flush>)
      * [`std::emit_on_flush`](<#/doc/io/manip/emit_on_flush>)
      * [`std::noemit_on_flush`](<#/doc/io/manip/emit_on_flush>)
      * [`std::flush_emit`](<#/doc/io/manip/flush_emit>)

| (desde C++20)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 120](<https://cplusplus.github.io/LWG/issue120>) | C++98 | usuários podiam instanciar explicitamente templates da biblioteca padrão para tipos não definidos pelo usuário | proibido
[LWG 232](<https://cplusplus.github.io/LWG/issue232>) | C++98 | usuários podiam especializar explicitamente templates da biblioteca padrão se a declaração dependesse de um nome definido pelo usuário com ligação externa (que pode se referir a um tipo não definido pelo usuário) | permitido apenas para tipos definidos pelo usuário
[LWG 422](<https://cplusplus.github.io/LWG/issue422>) | C++98 | usuários podiam especializar membros individuais ou templates de membro sem especializar a classe ou template de classe completa da biblioteca padrão | o comportamento é indefinido neste caso