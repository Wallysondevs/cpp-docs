# std::hash&lt;Key&gt;::operator()

Especializações de [std::hash](<#/doc/utility/hash>) devem definir um `operator()` que:

*   Recebe um único argumento `key` do tipo `Key`.
*   Retorna um valor do tipo [std::size_t](<#/doc/types/size_t>) que representa o valor hash de `key`.
*   Para dois parâmetros `k1` e `k2` que são iguais, [std::hash](<#/doc/utility/hash>)&lt;Key&gt;()(k1) == [std::hash](<#/doc/utility/hash>)&lt;Key&gt;()(k2).
*   Para dois parâmetros diferentes `k1` e `k2` que não são iguais, a probabilidade de que [std::hash](<#/doc/utility/hash>)&lt;Key&gt;()(k1) == [std::hash](<#/doc/utility/hash>)&lt;Key&gt;()(k2) deve ser muito pequena, aproximando-se de 1.0 / [std::numeric_limits](<#/doc/types/numeric_limits>)<size_t>::max().

### Parâmetros

- **key** — o objeto a ser "hashed"

### Valor de retorno

Um [std::size_t](<#/doc/types/size_t>) representando o valor hash.

### Exceções

Funções hash não devem lançar exceções.

### Exemplo

O código a seguir mostra como especializar o template [std::hash](<#/doc/utility/hash>) para uma classe personalizada. A função hash usa o algoritmo hash [Fowler–Noll–Vo](<https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function> "enwiki:Fowler–Noll–Vo hash function").

Execute este código
```
    #include <cstdint>
    #include <functional>
    #include <iostream>
    #include <string>
    
    struct Employee
    {
        std::string name;
        std::uint64_t ID;
    };
    
    namespace std
    {
        template <>
        class hash<Employee>
        {
        public:
            std::uint64_t operator()(const Employee& employee) const
            {
                 // computes the hash of an employee using a variant
                 // of the Fowler-Noll-Vo hash function
                 constexpr std::uint64_t prime{0x100000001B3};
                 std::uint64_t result{0xcbf29ce484222325};
    
                 for (std::uint64_t i{}, ie = employee.name.size(); i != ie; ++i)
                     result = (result * prime) ^ employee.name[i];
    
                 return result ^ (employee.ID << 1);
             }
        };
    }
    
    int main()
    {
        Employee employee;
        employee.name = "Zaphod Beeblebrox";
        employee.ID = 42;
    
        std::hash<Employee> hash_fn;
        std::cout << hash_fn(employee) << '\n';
    }
```

Saída:
```
    12615575401975788567
```