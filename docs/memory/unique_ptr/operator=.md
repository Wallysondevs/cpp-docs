# std::unique_ptr&lt;T,Deleter&gt;::operator=

```cpp
unique_ptr& operator=( unique_ptr&& r ) noexcept; | (1) | (constexpr desde C++23)
template< class U, class E >
unique_ptr& operator=( unique_ptr<U, E>&& r ) noexcept; | (2) | (constexpr desde C++23)
unique_ptr& operator=( std::nullptr_t ) noexcept; | (3) | (constexpr desde C++23)
unique_ptr& operator=( const unique_ptr& ) = delete;  // (4)
```

1) Operador de atribuição por movimento. Transfere a propriedade de `r` para `*this` como se chamasse `reset(r.release())` seguido pela atribuição de [get_deleter()](<#/doc/memory/unique_ptr/get_deleter>) de [std::forward](<#/doc/utility/forward>)&lt;Deleter&gt;(r.get_deleter()).

Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_move_assignable](<#/doc/types/is_move_assignable>)&lt;Deleter&gt;::value for `true`.

Se `Deleter` não for um tipo de referência, o comportamento é indefinido se

* `Deleter` não for [MoveAssignable](<#/doc/named_req/MoveAssignable>), ou
* atribuir [get_deleter()](<#/doc/memory/unique_ptr/get_deleter>) de um [rvalue](<#/doc/language/value_category>) do tipo `Deleter` lançaria uma exceção.

Caso contrário (`Deleter` é um tipo de referência), o comportamento é indefinido se

* `std::remove_reference<Deleter>::type` não for [CopyAssignable](<#/doc/named_req/CopyAssignable>), ou
* atribuir [get_deleter()](<#/doc/memory/unique_ptr/get_deleter>) de um [lvalue](<#/doc/language/value_category>) do tipo `Deleter` lançaria uma exceção.

2) Operador de atribuição de conversão. Transfere a propriedade de `r` para `*this` como se chamasse `reset(r.release())` seguido pela atribuição de [get_deleter()](<#/doc/memory/unique_ptr/get_deleter>) de [std::forward](<#/doc/utility/forward>)&lt;E&gt;(r.get_deleter()).

Esta sobrecarga participa da resolução de sobrecarga somente se todas as seguintes condições forem satisfeitas:

* [std::is_assignable](<#/doc/types/is_assignable>)<Deleter&, E&&>::value for `true`.
* Para o template primário, todas as seguintes condições são satisfeitas:
    * `U` não é um tipo array.
    * `unique_ptr<U, E>::pointer` é implicitamente conversível para `pointer`, e.
* Para a especialização de array (`unique_ptr<T[]>`), todas as seguintes condições são satisfeitas:
    * `U` é um tipo array.
    * `pointer` é do mesmo tipo que `element_type*`.
    * `unique_ptr<U, E>::pointer` é do mesmo tipo que `unique_ptr<U, E>::element_type*`.
    * `unique_ptr<U, E>::element_type(*)[]` é conversível para `element_type(*)[]`.

Se `E` não for um tipo de referência, o comportamento é indefinido se atribuir [get_deleter()](<#/doc/memory/unique_ptr/get_deleter>) de um [rvalue](<#/doc/language/value_category>) do tipo `E` for malformado ou lançaria uma exceção.

Caso contrário (`E` é um tipo de referência), o comportamento é indefinido se atribuir [get_deleter()](<#/doc/memory/unique_ptr/get_deleter>) de um [lvalue](<#/doc/language/value_category>) do tipo `E` for malformado ou lançaria uma exceção.

3) Efetivamente o mesmo que chamar [reset()](<#/doc/memory/unique_ptr/reset>).

4) O operador de atribuição por cópia é explicitamente deletado.

### Parâmetros

- **r** — smart pointer do qual a propriedade será transferida

### Valor de retorno

`*this`

### Notas

Como um tipo somente-movível, o operador de atribuição de `unique_ptr` aceita apenas argumentos [rvalues](<#/doc/language/value_category>) (por exemplo, o resultado de [std::make_unique](<#/doc/memory/unique_ptr/make_unique>) ou uma variável `unique_ptr` movida com `std::move`).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
     
    struct Foo
    {
        int id;
        Foo(int id) : id(id) { std::cout << "Foo " << id << '\n'; }
        ~Foo() { std::cout << "~Foo " << id << '\n'; }
    };
     
    int main() 
    {
        std::unique_ptr<Foo> p1(std::make_unique<Foo>(1));
     
        {
            std::cout << "Creating new Foo...\n";
            std::unique_ptr<Foo> p2(std::make_unique<Foo>(2));
            // p1 = p2; // Erro ! não é possível copiar unique_ptr
            p1 = std::move(p2);
            std::cout << "About to leave inner block...\n";
     
            // A instância de Foo continuará a existir, 
            // apesar de p2 sair do escopo
        }
     
        std::cout << "About to leave program...\n";
    }
```

Saída:
```
    Foo 1
    Creating new Foo...
    Foo 2
    ~Foo 1
    About to leave inner block...
    About to leave program...
    ~Foo 2
```

### Relatórios de Defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 2047](<https://cplusplus.github.io/LWG/issue2047>) | C++11 | para a sobrecarga (2), [get_deleter()](<#/doc/memory/unique_ptr/get_deleter>) foi atribuído de
[std::forward](<#/doc/utility/forward>)&lt;Deleter&gt;(r.get_deleter()) | corrigido para
[std::forward](<#/doc/utility/forward>)&lt;E&gt;(r.get_deleter())
[LWG 2118](<https://cplusplus.github.io/LWG/issue2118>) | C++11 | `unique_ptr<T[]>::operator=`
rejeitava conversões de qualificação | aceita
[LWG 2228](<https://cplusplus.github.io/LWG/issue2228>)
([N4366](<https://wg21.link/N4366>)) | C++11 | o operador de atribuição de conversão
não possuía a restrição de atribuibilidade | a restrição foi adicionada
[LWG 2246](<https://cplusplus.github.io/LWG/issue2246>) | C++11 | o alvo de atribuição do deleter convertido
de r não foi especificado | especificado como [get_deleter()](<#/doc/memory/unique_ptr/get_deleter>)
[LWG 2899](<https://cplusplus.github.io/LWG/issue2899>) | C++11 | o operador de atribuição por movimento não era restrito | restrito