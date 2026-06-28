# std::any::type

```cpp
const std::type_info& type() const noexcept;  // (desde C++17)
```

Consulta o tipo contido.

### Valor de retorno

O typeid do valor contido se a instância não estiver vazia, caso contrário typeid(void).

### Exemplo

O exemplo demonstra o idioma visitor de `std::any` com a capacidade de registrar novos visitors em tempo de compilação e em tempo de execução.

Execute este código
```cpp
    #include <any>
    #include <functional>
    #include <iomanip>
    #include <iostream>
    #include <type_traits>
    #include <typeindex>
    #include <typeinfo>
    #include <unordered_map>
    #include <vector>
    
    template<class T, class F>
    inline std::pair<const std::type_index, std::function<void(const std::any&)>>
        to_any_visitor(const F& f)
    {
        return
        {
            std::type_index(typeid(T)),
            g = f const& a)
            {
                if constexpr (std::is_void_v<T>)
                    g();
                else
                    g(std::any_cast<T const&>(a));
            }
        };
    }
    
    static std::unordered_map<std::type_index, std::function<void(const std::any&)>>
        any_visitor
    {
        to_any_visitor<void>([] { std::cout << "{}"; }),
        to_any_visitor<int>( { std::cout << x; }),
        to_any_visitor<unsigned>( { std::cout << x; }),
        to_any_visitor<float>( { std::cout << x; }),
        to_any_visitor<double>( { std::cout << x; }),
        to_any_visitor<char const*>(
            { std::cout << std::quoted(s); }),
        // ... adicione mais manipuladores para seus tipos ...
    };
    
    inline void process(const std::any& a)
    {
        if (const auto it = any_visitor.find(std::type_index(a.type()));
            it != any_visitor.cend())
            it->second(a);
        else
            std::cout << "Unregistered type " << std::quoted(a.type().name());
    }
    
    template<class T, class F>
    inline void register_any_visitor(const F& f)
    {
        std::cout << "Register visitor for type "
                  << std::quoted(typeid(T).name()) << '\n';
        any_visitor.insert(to_any_visitor<T>(f));
    }
    
    int main()
    {
        std::vector<std::any> va{{}, 42, 123u, 3.14159f, 2.71828, "C++17"};
    
        for (int n{}; const std::any& a : va)
        {
            std::cout << (n++ ? ", " : "[");
            process(a);
        }
        std::cout << "]\n";
    
        process(std::any(0xFULL)); //< Tipo não registrado "y" (unsigned long long)
        std::cout << '\n';
    
        register_any_visitor<unsigned long long>(
        {
            std::cout << std::hex << std::showbase << x; 
        });
    
        process(std::any(0xFULL)); //< OK: 0xf
        std::cout << '\n';
    }
```

Saída possível:
```
    [{}, 42, 123, 3.14159, 2.71828, "C++17"]
    Tipo não registrado "y"
    Registrar visitor para o tipo "y"
    0xf
```

### Veja também

[ type_index](<#/doc/types/type_index>)(C++11) | wrapper em torno de um objeto `type_info`, que pode ser usado como índice em containers associativos e associativos não ordenados
(classe)