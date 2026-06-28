# std::experimental::scope_exit

Definido no cabeçalho `[<experimental/scope>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/scope&action=edit&redlink=1> "cpp/header/experimental/scope \(page does not exist\)")

```c
template< class EF >
class scope_exit;
```

  
O template de classe `scope_exit` é um scope guard de propósito geral destinado a chamar sua função de saída quando um escopo é encerrado.

`scope_exit` não é [CopyConstructible](<#/doc/named_req/CopyConstructible>), [CopyAssignable](<#/doc/named_req/CopyAssignable>) ou [MoveAssignable](<#/doc/named_req/MoveAssignable>), no entanto, pode ser [MoveConstructible](<#/doc/named_req/MoveConstructible>) se `EF` atender a alguns requisitos, o que permite encapsular um `scope_exit` em outro objeto.

Um `scope_exit` pode ser ativo, ou seja, chama sua função de saída na destruição, ou inativo, ou seja, não faz nada na destruição. Um `scope_exit` é ativo após ser construído a partir de uma função de saída.

Um `scope_exit` pode se tornar inativo chamando `release()` nele, seja manualmente ou automaticamente (pelo construtor de movimento). Um `scope_exit` inativo também pode ser obtido inicializando-o com outro `scope_exit` inativo. Uma vez que um `scope_exit` está inativo, ele não pode se tornar ativo novamente.

Um `scope_exit` efetivamente mantém um `EF` e um flag booleano indicando se ele está ativo.

### Parâmetros de template

- **EF** — tipo da função de saída armazenada
Requisitos de tipo   
-`EF` deve ser um dos seguintes: 

  * um tipo [Destructible](<#/doc/named_req/Destructible>) [FunctionObject](<#/doc/named_req/FunctionObject>), 
  * uma referência lvalue para [FunctionObject](<#/doc/named_req/FunctionObject>), 
  * uma referência lvalue para função. 

  
-Chamar um lvalue de [std::remove_reference_t](<#/doc/types/remove_reference>)<EF> sem argumentos deve ser bem-formado.   
  
### Funções membro

[ (constructor)](<#/doc/experimental/scope_exit/scope_exit>) | constrói um novo `scope_exit`   
(public member function)  
[ (destructor)](<#/doc/experimental/scope_exit/~scope_exit>) | chama a função de saída quando o escopo é encerrado se o `scope_exit` estiver ativo, então destrói o `scope_exit`   
(public member function)  
operator=[deleted] | `scope_exit` não é atribuível   
(public member function)  
  
##### Modificadores   
  
[ release](<#/doc/experimental/scope_exit/release>) | torna o `scope_exit` inativo   
(public member function)  
  
### [Deduction guides](<#/doc/experimental/scope_exit/deduction_guides>)

### Notas

Construir um `scope_exit` com duração de armazenamento dinâmica pode levar a comportamento inesperado.

Se o `EF` armazenado em um objeto `scope_exit` se refere a uma variável local da função onde ele é definido, por exemplo, como uma lambda que captura a variável por referência, e essa variável é usada como um operando de retorno nessa função, essa variável pode já ter sido retornada quando o destrutor do `scope_exit` é executado, chamando a função de saída. Isso pode levar a um comportamento surpreendente.

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

[ scope_fail](<#/doc/experimental/scope_fail>) | encapsula um objeto de função e o invoca ao sair do escopo através de uma exceção   
(class template)  
[ scope_success](<#/doc/experimental/scope_success>) | encapsula um objeto de função e o invoca ao sair do escopo normalmente   
(class template)  
[ default_delete](<#/doc/memory/default_delete>)(C++11) | deleter padrão para [unique_ptr](<#/doc/memory/unique_ptr>)   
(class template)