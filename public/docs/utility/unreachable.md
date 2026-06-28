# std::unreachable

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
[[noreturn]] void unreachable();
```

  
Invoca [comportamento indefinido](<#/doc/language/ub>) em um determinado ponto. 

Uma implementação pode usar isso para otimizar ramos de código impossíveis (tipicamente, em builds otimizadas) ou para capturá-los para prevenir execução posterior (tipicamente, em builds de depuração). 

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_unreachable`](<#/doc/feature_test>) | [`202202L`](<#/>) | (C++23) | `std::unreachable`  
  
### Possível implementação
```
    [[noreturn]] inline void unreachable()
    {
        // Uses compiler specific extensions if possible.
        // Even if no extension is used, undefined behavior is still raised by
        // an empty function body and the noreturn attribute.
    #if defined(_MSC_VER) && !defined(__clang__) // MSVC
        __assume(false);
    #else // GCC, Clang
        __builtin_unreachable();
    #endif
    }
```
  
---  
  
### Exemplo

Execute este código
```
    #include <cassert>
    #include <cstddef>
    #include <cstdint>
    #include <utility>
    #include <vector>
     
    struct Color { std::uint8_t r, g, b, a; };
     
    // Assume that only restricted set of texture caps is supported.
    void generate_texture(std::vector<Color>& tex, std::size_t xy)
    {
        switch (xy)
        {
        case 128: [[fallthrough]];
        case 256: [[fallthrough]];
        case 512: /* ... */
            tex.clear();
            tex.resize(xy * xy, Color{0, 0, 0, 0});
            break;
        default:
            std::unreachable();
        }
    }
     
    int main()
    {
        std::vector<Color> tex;
        generate_texture(tex, 128); // OK
        assert(tex.size() == 128 * 128);
        generate_texture(tex, 32);  // Results in undefined behavior
    }
```

Saída possível: 
```
    Segmentation fault
```

### Veja também

`[[[assume](<#/doc/language/attributes/assume>)(_expression_)]]`(C++23) |  especifica que a _expressão_ sempre será avaliada como verdadeira em um determinado ponto  
(especificador de atributo)  
[ assume_aligned](<#/doc/memory/assume_aligned>)(C++20) |  informa ao compilador que um ponteiro está alinhado   
(modelo de função)  
[Documentação C](<#/>) para unreachable  
  
### Links Externos

1\.  | [Documentação GCC: `__builtin_unreachable`](<https://gcc.gnu.org/onlinedocs/gcc/Other-Builtins.html#index-_005f_005fbuiltin_005funreachable>)  
---|---
2\.  | [Documentação Clang: `__builtin_unreachable`](<https://clang.llvm.org/docs/LanguageExtensions.html#builtin-unreachable>)  
3\.  | [Documentação MSVC: `__assume`](<https://docs.microsoft.com/en-us/cpp/intrinsics/assume>)