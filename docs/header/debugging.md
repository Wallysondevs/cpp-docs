# Cabeçalho da biblioteca padrão &lt;debugging&gt; (C++26)

Este cabeçalho faz parte da biblioteca de [diagnósticos](<#/doc/error>).
  
### Funções
  
---  
[ breakpoint](<#/doc/utility/breakpoint>)(C++26) | pausa o programa em execução quando chamada   
(função)  
[ breakpoint_if_debugging](<#/doc/utility/breakpoint_if_debugging>)(C++26) | chama std::breakpoint se std::is_debugger_present retornar true   
(função)  
[ is_debugger_present](<#/doc/utility/is_debugger_present>)(C++26) | verifica se um programa está sendo executado sob o controle de um depurador   
(função)  
  
### Sinopse
```cpp 
    // all freestanding
    namespace std {
      // debugging utility
      void breakpoint() noexcept;
      void breakpoint_if_debugging() noexcept;
      bool is_debugger_present() noexcept;
    }
```