# std::ios_base::operator=

```cpp
private:
ios_base& operator=( const ios_base& );  // (até C++11)
public:
ios_base& operator=( const ios_base& ) = delete;  // (desde C++11)
```

  
O operador de atribuição de cópia é privado (até C++11) deletado (desde C++11): streams não são atribuíveis por cópia.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 50](<https://cplusplus.github.io/LWG/issue50>) | C++98 | o operador de atribuição de cópia não foi especificado | especificado como privado