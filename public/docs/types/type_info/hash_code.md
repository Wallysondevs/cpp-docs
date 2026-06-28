# std::type_info::hash_code

```cpp
std::size_t hash_code() const noexcept;  // (desde C++11)
```

Retorna um valor não especificado (aqui denotado por _hash code_) tal que para todos os objetos [std::type_info](<#/doc/types/type_info>) que se referem ao mesmo tipo, seu _hash code_ é o mesmo.

Nenhuma outra garantia é dada: objetos [std::type_info](<#/doc/types/type_info>) que se referem a tipos diferentes podem ter o mesmo _hash code_ (embora o padrão recomende que as implementações evitem isso o máximo possível), e o _hash code_ para o mesmo tipo pode mudar entre invocações do mesmo programa.

### Parâmetros

(nenhum)

### Valor de retorno

Um valor que é idêntico para todos os objetos [std::type_info](<#/doc/types/type_info>) que se referem ao mesmo tipo.

### Exemplo

O programa a seguir é um exemplo de mapeamento eficiente de tipo-valor sem usar [std::type_index](<#/doc/types/type_index>).

Execute este código
```
    #include <functional>
    #include <iostream>
    #include <memory>
    #include <string>
    #include <typeinfo>
    #include <unordered_map>
    
    struct A
    {
        virtual ~A() {}
    };
    
    struct B : A {};
    struct C : A {};
    
    using TypeInfoRef = std::reference_wrapper<const std::type_info>;
    
    struct Hasher
    {
        std::size_t operator()(TypeInfoRef code) const
        {
            return code.get().hash_code();
        }
    };
    
    struct EqualTo
    {
        bool operator()(TypeInfoRef lhs, TypeInfoRef rhs) const
        {
            return lhs.get() == rhs.get();
        }
    };
    
    int main()
    {
        std::unordered_map<TypeInfoRef, std::string, Hasher, EqualTo> type_names;
    
        type_names[typeid(int)] = "int";
        type_names[typeid(double)] = "double";
        type_names[typeid(A)] = "A";
        type_names[typeid(B)] = "B";
        type_names[typeid(C)] = "C";
    
        int i;
        double d;
        A a;
    
        // note that we're storing pointer to type A
        std::unique_ptr<A> b(new B);
        std::unique_ptr<A> c(new C);
    
        std::cout << "i is " << type_names[typeid(i)] << '\n';
        std::cout << "d is " << type_names[typeid(d)] << '\n';
        std::cout << "a is " << type_names[typeid(a)] << '\n';
        std::cout << "*b is " << type_names[typeid(*b)] << '\n';
        std::cout << "*c is " << type_names[typeid(*c)] << '\n';
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

[ operator==operator!=](<#/doc/types/type_info/operator_cmp>)(removido em C++20) | verifica se os objetos se referem ao mesmo tipo
(função membro pública)
[ name](<#/doc/types/type_info/name>) | nome do tipo definido pela implementação
(função membro pública)