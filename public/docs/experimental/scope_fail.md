# std::experimental::scope_fail

Definido no cabeçalho `[<experimental/scope>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/scope&action=edit&redlink=1> "cpp/header/experimental/scope \(page does not exist\)")`

```c
template< class EF >
class scope_fail;
```

O modelo de classe `scope_fail` é um *scope guard* de propósito geral destinado a chamar sua função de saída quando um escopo é encerrado via uma exceção.

`scope_fail` não é [CopyConstructible](<#/doc/named_req/CopyConstructible>), [CopyAssignable](<#/doc/named_req/CopyAssignable>) ou [MoveAssignable](<#/doc/named_req/MoveAssignable>), no entanto, pode ser [MoveConstructible](<#/doc/named_req/MoveConstructible>) se `EF` atender a alguns requisitos, o que permite envolver um `scope_fail` em outro objeto.

Um `scope_fail` pode ser ativo, ou seja, chama sua função de saída na destruição, ou inativo, ou seja, não faz nada na destruição. Um `scope_fail` está ativo após ser construído a partir de uma função de saída.

Um `scope_fail` pode se tornar inativo chamando `release()` nele, seja manualmente ou automaticamente (pelo construtor de movimento). Um `scope_fail` inativo também pode ser obtido inicializando-o com outro `scope_fail` inativo. Uma vez que um `scope_fail` está inativo, ele não pode se tornar ativo novamente.

Um `scope_fail` efetivamente mantém um `EF` e uma flag booleana indicando se está ativo, juntamente com um contador de exceções não capturadas usado para detectar se o destrutor é chamado durante o desenrolamento da pilha.

### Parâmetros de template

- **EF** — tipo da função de saída armazenada
Requisitos de tipo
-`EF` deve ser um dos seguintes:

  * um tipo [Destructible](<#/doc/named_req/Destructible>) [FunctionObject](<#/doc/named_req/FunctionObject>),
  * uma referência lvalue para [FunctionObject](<#/doc/named_req/FunctionObject>),
  * uma referência lvalue para função.

-Chamar um lvalue de [std::remove_reference_t](<#/doc/types/remove_reference>)&lt;EF&gt; sem argumentos deve ser bem-formado.

### Funções membro

[ (construtor)](<#/doc/experimental/scope_fail/scope_fail>) | constrói um novo `scope_fail`
(função membro pública)
[ (destrutor)](<#/doc/experimental/scope_fail/~scope_fail>) | chama a função de saída quando o escopo é encerrado via uma exceção se o `scope_fail` estiver ativo, então destrói o `scope_fail`
(função membro pública)
operator=[deleted] | `scope_fail` não é atribuível
(função membro pública)

##### Modificadores

[ release](<#/doc/experimental/scope_fail/release>) | torna o `scope_fail` inativo
(função membro pública)

### [Deduction guides](<#/doc/experimental/scope_fail/deduction_guides>)

### Notas

Construir um `scope_fail` com duração de armazenamento dinâmica pode levar a um comportamento inesperado.

Construir um `scope_fail` a partir de outro `scope_fail` criado em uma thread diferente também pode levar a um comportamento inesperado, já que a contagem de exceções não capturadas obtidas em threads diferentes pode ser comparada durante a destruição.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <cstdlib>
    #include <string_view>
    #include <experimental/scope>
    
    void print_exit_status(std::string_view name, bool exit_status, bool did_throw) {
      std::cout << name << ":\n";
      std::cout << "  Throwed exception  " << (did_throw ? "yes" : "no") << "\n";
      std::cout << "  Exit status        " << (exit_status ? "finished" : "pending") << "\n\n";
    }
    
    // Randomly throw an exception (50% chance)
    void maybe_throw() {
        if (std::rand() >= RAND_MAX / 2)
            throw std::exception{};
    }
    
    int main() {
      bool exit_status{false}, did_throw{false};
    
      // Manual handling at "end of scope"
      try {
        maybe_throw();
        exit_status = true; 
      } catch (...) { did_throw = true; }
      print_exit_status("Manual handling", exit_status, did_throw);
    
      // Using scope_exit: runs on scope exit (success or exception)
      exit_status = did_throw = false;
      try {
        auto guard = std::experimental::scope_exit{[&]{ exit_status = true; } };
        maybe_throw();
      } catch (...) { did_throw = true; }
      print_exit_status("scope_exit", exit_status, did_throw);
    
      // Using scope_fail: runs only if an exception occurs
      exit_status = did_throw = false;
      try {
        auto guard = std::experimental::scope_fail{[&]{ exit_status = true; } };
        maybe_throw();
      } catch (...) { did_throw = true; }
      print_exit_status("scope_fail", exit_status, did_throw);
    
      // Using scope_success: runs only if no exception occurs
      exit_status = did_throw = false;
      try {
        auto guard = std::experimental::scope_success{[&]{ exit_status = true; } };
        maybe_throw();
      } catch (...) { did_throw = true; }
      print_exit_status("scope_success", exit_status, did_throw);
    }
```

Saída:
```
    Manual handling:
      Throwed exception  yes
      Exit status        pending
    
    scope_exit:
      Throwed exception  no
      Exit status        finished
    
    scope_fail:
      Throwed exception  yes
      Exit status        finished
    
    scope_success:
      Throwed exception  yes
      Exit status        pending
```

### Veja também

[ scope_exit](<#/doc/experimental/scope_exit>) | envolve um objeto de função e o invoca ao sair do escopo
(modelo de classe)
[ scope_success](<#/doc/experimental/scope_success>) | envolve um objeto de função e o invoca ao sair do escopo normalmente
(modelo de classe)
[ default_delete](<#/doc/memory/default_delete>)(C++11) | deleter padrão para [unique_ptr](<#/doc/memory/unique_ptr>)
(modelo de classe)