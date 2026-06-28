# std::type_index::name

```cpp
const char* name() const noexcept;  // (desde C++11)
```

Retorna o nome do objeto [std::type_info](<#/doc/types/type_info>) associado. Equivalente a chamar [std::type_info::name()](<#/doc/types/type_info/name>) diretamente.

### Parameters

(nenhum)

### Return value

O nome do objeto [std::type_info](<#/doc/types/type_info>) associado.

### Example

Execute este código
```
    #include <iostream>
    #include <typeindex>
    int main() {
        std::cout << std::type_index(typeid(std::cout)).name();
    }
```

Saída possível:
```
    NSt3__113basic_ostreamIcNS_11char_traitsIcEEEE
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Applied to | Behavior as published | Correct behavior
---|---|---|---
[LWG 2144](<https://cplusplus.github.io/LWG/issue2144>) | C++11 | `type_index::name` não era exigido ser noexcept | exigido