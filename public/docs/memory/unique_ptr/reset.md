# std::unique_ptr&lt;T,Deleter&gt;::reset

membros do template primário, unique_ptr&lt;T&gt;
void reset( pointer ptr = pointer() ) noexcept; |  (1) | (constexpr desde C++23)  
membros da especialização unique_ptr<T[]>
template< class U >   
void reset( U ptr ) noexcept; |  (2) | (constexpr desde C++23)  
---|---|---
void reset( [std::nullptr_t](<#/doc/types/nullptr_t>) = nullptr ) noexcept; |  (3) | (constexpr desde C++23)  

  
Substitui o objeto gerenciado.

1,2) Equivalente a auto old_ptr = get();  
/* atribui “ptr” ao ponteiro armazenado */  
if (old_ptr)  
get_deleter()(old_ptr);.

Se get_deleter()(old_ptr) lançar uma exceção, o comportamento é indefinido.

2) Esta sobrecarga participa da resolução de sobrecarga somente se `U` for do mesmo tipo que `pointer`, ou se todas as seguintes condições forem satisfeitas: 

  * `pointer` é do mesmo tipo que `element_type*`. 
  * `U` é um tipo de ponteiro `V*` tal que `V(*)[]` é conversível para `element_type(*)[]`.

3) Equivalente a reset(pointer()).

### Parâmetros

ptr  |  \-  |  ponteiro para um novo objeto a ser gerenciado   
  
### Notas

Para substituir o objeto gerenciado enquanto também fornece um novo deleter, o operador de atribuição de movimento pode ser usado. 

Um teste para auto-reset, ou seja, se ptr aponta para um objeto já gerenciado por *this, não é realizado, exceto quando fornecido como uma extensão do compilador ou como um assert de depuração. Note que código como p.reset(p.release()) não envolve auto-reset, apenas código como p.reset(p.get()) o faz. 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <memory>
     
    struct Foo // object to manage
    {
        Foo() { std::cout << "Foo...\n"; }
        ~Foo() { std::cout << "~Foo...\n"; }
    };
     
    struct D // deleter
    {
        void operator() (Foo* p)
        {
            std::cout << "Calling delete for Foo object... \n";
            delete p;
        }
    };
     
    int main()
    {
        std::cout << "Creating new Foo...\n";
        std::unique_ptr<Foo, D> up(new Foo(), D()); // up owns the Foo pointer (deleter D)
     
        std::cout << "Replace owned Foo with a new Foo...\n";
        up.reset(new Foo());  // calls deleter for the old one
     
        std::cout << "Release and delete the owned Foo...\n";
        up.reset(nullptr);      
    }
```

Saída: 
```
    Creating new Foo...
    Foo...
    Replace owned Foo with a new Foo...
    Foo...
    Calling delete for Foo object...
    ~Foo...
    Release and delete the owned Foo...
    Calling delete for Foo object...
    ~Foo...
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2118](<https://cplusplus.github.io/LWG/issue2118>) | C++11  | `unique_ptr<T[]>::reset` rejeitava conversões de qualificação  | aceita   
[LWG 2169](<https://cplusplus.github.io/LWG/issue2169>) | C++11  | a sobrecarga `unique_ptr<T[]>::reset(pointer)` existia  | removeu a sobrecarga   
  
### Veja também

[ release](<#/doc/memory/unique_ptr/release>) |  retorna um ponteiro para o objeto gerenciado e libera a posse   
(função membro pública)  