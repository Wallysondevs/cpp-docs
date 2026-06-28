# std::experimental::optional&lt;T&gt;::value

constexpr T& value() &;  
constexpr const T & value() const &; |  (1)  |  (TS de fundamentos da biblioteca)  
constexpr T&& value() &&;  
constexpr const T&& value() const &&; |  (2)  |  (TS de fundamentos da biblioteca)  

  
Retorna o valor contido. 

1) Equivalente a return bool(*this) ? *val : throw bad_optional_access();.

2) Equivalente a return bool(*this) ? std::move(*val) : throw bad_optional_access();.

### Parameters

(nenhum) 

### Return value

Uma referência para o valor contido. 

### Exceptions

[std::experimental::bad_optional_access](<#/doc/utility/optional/bad_optional_access>) se *this não contiver um valor. 

### Notes

O operador de desreferência [operator*()](<#/doc/experimental/optional/operator_star_>) não verifica se este optional contém um valor, o que pode ser mais eficiente do que `value()`. 

### Example

Execute este código
```
    #include <experimental/optional>
    #include <iostream>
     
    int main()
    {
        std::experimental::optional<int> opt = {};
     
        try
        {
            int n = opt.value();
        }
        catch (const std::logic_error& e)
        {
            std::cout << e.what() << '\n';
        }
    }
```

Possible output: 
```
    optional<T>::value: not engaged
```

### See also

[ value_or](<#/doc/experimental/optional/value_or>) |  retorna o valor contido se disponível, outro valor caso contrário   
(função membro pública)  
[ operator->operator*](<#/doc/experimental/optional/operator_star_>) |  acessa o valor contido   
(função membro pública)  
[ bad_optional_access](<#/doc/experimental/optional/bad_optional_access>)(TS de fundamentos da biblioteca) |  exceção indicando acesso verificado a um optional que não contém um valor   
(classe)