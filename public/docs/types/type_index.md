# std::type_index

Definido no cabeçalho `[<typeindex>](<#/doc/header/typeindex>)`

```c
class type_index;
```

A classe `type_index` é uma classe wrapper em torno de um objeto [std::type_info](<#/doc/types/type_info>), que pode ser usado como índice em containers associativos e associativos não ordenados. A relação com o objeto `type_info` é mantida através de um ponteiro, portanto `type_index` é [CopyConstructible](<#/doc/named_req/CopyConstructible>) e [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Funções membro

[ (construtor)](<#/doc/types/type_index/type_index>) | constrói o objeto
(função membro pública)
(destrutor)(declarado implicitamente) | destrói o objeto `type_index`
(função membro pública)
operator=(declarado implicitamente) | atribui um objeto `type_index`
(função membro pública)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/types/type_index/operator_cmp>)(removido em C++20)(C++20) | compara os objetos [std::type_info](<#/doc/types/type_info>) subjacentes
(função membro pública)
[ hash_code](<#/doc/types/type_index/hash_code>) | retorna o código hash
(função membro pública)
[ name](<#/doc/types/type_index/name>) | retorna o nome do tipo definido pela implementação,
associado ao objeto [`type_info`](<#/doc/types/type_info>) subjacente
(função membro pública)

### Classes auxiliares

[ std::hash<std::type_index>](<#/doc/types/type_index/hash>)(C++11) | suporte a hash para `std::type_index`
(especialização de template de classe)

### Exemplo

O programa a seguir é um exemplo de mapeamento eficiente de tipo-valor.

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    #include <string>
    #include <typeindex>
    #include <typeinfo>
    #include <unordered_map>
    
    struct A
    {
        virtual ~A() {}
    };
    
    struct B : A {};
    struct C : A {};
    
    int main()
    {
        std::unordered_map<std::type_index, std::string> type_names;
    
        type_names[std::type_index(typeid(int))] = "int";
        type_names[std::type_index(typeid(double))] = "double";
        type_names[std::type_index(typeid(A))] = "A";
        type_names[std::type_index(typeid(B))] = "B";
        type_names[std::type_index(typeid(C))] = "C";
    
        int i;
        double d;
        A a;
    
        // note that we're storing pointer to type A
        std::unique_ptr<A> b(new B);
        std::unique_ptr<A> c(new C);
    
        std::cout << "i is " << type_names[std::type_index(typeid(i))] << '\n';
        std::cout << "d is " << type_names[std::type_index(typeid(d))] << '\n';
        std::cout << "a is " << type_names[std::type_index(typeid(a))] << '\n';
        std::cout << "*b is " << type_names[std::type_index(typeid(*b))] << '\n';
        std::cout << "*c is " << type_names[std::type_index(typeid(*c))] << '\n';
    }
```

Saída:
```
    i is int
    d is double
    a is A
    *b is B
    *c is C
```

### Veja também

[ type_info](<#/doc/types/type_info>) | contém informações de algum tipo, a classe retornada pelo operador typeid
(classe)