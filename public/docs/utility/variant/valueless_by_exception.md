# std::variant&lt;Types...&gt;::valueless_by_exception

```cpp
constexpr bool valueless_by_exception() const noexcept;  // (desde C++17)
```

  
Retorna `false` se e somente se o variant contém um valor.

### Notas

Um variant pode se tornar sem valor ao inicializar o valor contido nas seguintes situações:

  * (garantido) uma exceção é lançada durante a [atribuição por movimento](<#/>)
  * (opcional) uma exceção é lançada durante a [atribuição por cópia](<#/>)
  * (opcional) uma exceção é lançada durante uma [atribuição](<#/>) que muda o tipo
  * (opcional) uma exceção é lançada durante um [`emplace`](<#/doc/utility/variant/emplace>) que muda o tipo

Como o variant nunca tem permissão para alocar memória dinâmica, o valor anterior não pode ser retido e, portanto, restaurado nessas situações. Os casos "opcionais" podem evitar lançar uma exceção se o tipo fornecer movimentos que não lançam exceções e a implementação primeiro constrói o novo valor na stack e depois o move para o variant.

Isso se aplica mesmo a variants de tipos não-classe:
```
    struct S
    {
        operator int() { throw 42; }
    };
    std::variant<float, int> v{12.f}; // OK
    v.emplace<1>(S()); // v may be valueless
```

Um variant que está _sem valor por exceção_ — ou seja, não tem valor devido a uma exceção anterior de uma das situações listadas acima — é tratado como estando em um estado inválido:

  * [`index`](<#/doc/utility/variant/index>) retorna [`variant_npos`](<#/doc/utility/variant/variant_npos>)
  * [`get`](<#/doc/utility/variant/get>) lança [`bad_variant_access`](<#/doc/utility/variant/bad_variant_access>)
  * [`visit`](<#/doc/utility/variant/visit2>) e o [`visit`](<#/doc/utility/variant/visit>) membro (desde C++26) lançam [`bad_variant_access`](<#/doc/utility/variant/bad_variant_access>)

### Exemplo

Execute este código
```
    #include <cassert>
    #include <iostream>
    #include <stdexcept>
    #include <string>
    #include <variant>
     
    struct Demo
    {
        Demo(int) {}
        Demo(const Demo&) { throw std::domain_error("copy ctor"); }
        Demo& operator= (const Demo&) = default;
    };
     
    int main()
    {
        std::variant<std::string, Demo> var{"str"};
        assert(var.index() == 0);
        assert(std::get<0>(var) == "str");
        assert(var.valueless_by_exception() == false);
     
        try
        {
            var = Demo{555};
        }
        catch (const std::domain_error& ex)
        {
            std::cout << "1) Exception: " << ex.what() << '\n';
        }
        assert(var.index() == std::variant_npos);
        assert(var.valueless_by_exception() == true);
     
        // Now the var is "valueless" which is an invalid state caused
        // by an exception raised in the process of type-changing assignment.
     
        try
        {
            std::get<1>(var);
        }
        catch (const std::bad_variant_access& ex)
        {
            std::cout << "2) Exception: " << ex.what() << '\n';
        }
     
        var = "str2";
        assert(var.index() == 0);
        assert(std::get<0>(var) == "str2");
        assert(var.valueless_by_exception() == false);
    }
```

Saída possível:
```
    1) Exception: copy ctor
    2) Exception: std::get: variant is valueless
```

### Veja também

[ get(std::variant)](<#/doc/utility/variant/get>)(C++17) |  lê o valor do variant dado o índice ou o tipo (se o tipo for único), lança exceção em caso de erro   
(modelo de função)  
[ index](<#/doc/utility/variant/index>) |  retorna o índice baseado em zero da alternativa contida pelo `variant`   
(função membro pública)  
[ bad_variant_access](<#/doc/utility/variant/bad_variant_access>)(C++17) |  exceção lançada em acessos inválidos ao valor de um `variant`   
(classe)