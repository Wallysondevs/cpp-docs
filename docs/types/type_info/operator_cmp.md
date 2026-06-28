# std::type_info::operator==, std::type_info::operator!=

bool operator==( const type_info& rhs ) const; |  (1) | (noexcept desde C++11)   
(constexpr desde C++23)  
bool operator!=( const type_info& rhs ) const; |  (2) | (noexcept desde C++11)   
(até C++20)  

  
Verifica se os objetos se referem aos mesmos tipos.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```
  
### Parâmetros

rhs  |  \-  |  outro objeto de informação de tipo para comparar   
  
### Valor de retorno

true se a operação de comparação for verdadeira, false caso contrário.

### Observações

[Macro de teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso   
---|---|---|---
[`__cpp_lib_constexpr_typeinfo`](<#/doc/feature_test>) | [`202106L`](<#/>) | (C++23) | Constexpr para `std::type_info::operator==`  
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <string>
    #include <typeinfo>
    #include <utility>
     
    class person
    {
    public:
        explicit person(std::string n) : name_(std::move(n)) {}
        virtual const std::string& name() const { return name_; }
     
    private:
        std::string name_;
    };
     
    class employee : public person
    {
    public:
        employee(std::string n, std::string p)
            : person(std::move(n)), profession_(std::move(p)) {}
     
        const std::string& profession() const { return profession_; }
     
    private:
        std::string profession_;
    };
     
    void print_info(const person& p)
    {
        if (typeid(person) == typeid(p))
            std::cout << p.name() << " is not an employee\n";
        else if (typeid(employee) == typeid(p))
        {
            std::cout << p.name() << " is an employee ";
            auto& emp = dynamic_cast<const employee&>(p);
            std::cout << "who works in " << emp.profession() << '\n';
        }
    }
     
    int main()
    {
        print_info(employee{"Paul","Economics"});
        print_info(person{"Kate"});
     
    #if __cpp_lib_constexpr_typeinfo
        if constexpr (typeid(employee) != typeid(person)) // C++23
            std::cout << "class `employee` != class `person`\n";
    #endif
    }
```

Saída possível: 
```
    Paul is an employee who works in Economics
    Kate is not an employee
    class `employee` != class `person`
```

### Veja também

[ before](<#/doc/types/type_info/before>) |  verifica se o tipo referido precede o tipo referido de outro objeto `type_info` na ordem definida pela implementação, ou seja, ordena os tipos referidos   
(função membro pública)  